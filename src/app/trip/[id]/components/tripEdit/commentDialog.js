import React, { useState, useContext, useEffect } from "react";
import { formatISO, format } from "date-fns";
import { getComments } from "@/services/getComments";
import { postComment } from "@/services/postComment";
import { deleteComment } from "@/services/deleteComment";
import { getProfile } from "@/services/getProfile";
import { DataContext } from "@/app/components/dataContext";
import { getToken } from "@/utils/getToken";

import { Dialog, DialogTitle, DialogContent, Container, Button, TextField, Box, IconButton, Typography, Avatar, Tooltip, useMediaQuery, useTheme } from "@mui/material";
import { Close as CloseIcon, Delete as DeleteIcon } from "@mui/icons-material";

const CommentDialog = ({ open, onClose, spotId }) => {
  const { currentLang } = useContext(DataContext);

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [commentCnt, setCommentCnt] = useState(0);
  const [userName, setUserName] = useState("");
  const [hoveredComment, setHoveredComment] = useState(null);
  const [key, setKey] = useState(0);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const translate = (key) => {
    const translations = {
      submit: {
        zh: "送出",
        en: "Submit",
      },
      comment: {
        zh: "發表...",
        en: "Comment...",
      },
      board: {
        zh: "留言板",
        en: "Bulletin Board",
      },
    };
    return translations[key][currentLang];
  };

  async function fetchComments() {
    try {
      const Token = getToken();
      const data = await getComments(Token, spotId);
      console.log("comments result:", data);
      if (data && data.length !== 0) {
        setCommentList(data);
        setCommentCnt(data.length);
      }
      else {
        console.warn("Error fetching all comments result:", data);
        setCommentList([]);
        setCommentCnt(0);
      }
    } catch (error) {
      console.error("Error fetching all comments result:", error);
    }
  }

  async function fetchProfile() {
    try {
      const Token = getToken();
      const data = await getProfile(Token);
      console.log("profile result:", data);
      if (data && data.userProfile){
        setUserName(data.userProfile[0].user_name);
      }

    } catch (error) {
      console.error("Error fetching profile result:", error);
    }
  }


  const handleClose = () => {
    //setNewMessage('');
    onClose();
  };

  const handleSubmit = async () => {
    if (comment !== "") {
      // Post the comment
      async function postNewComment() {
        try {
          const Token = getToken();
          const currentDate = formatISO(new Date()).split("T")[0];
          const currentTime = format(new Date(), "HH:mm");
          // console.log("currentDate:", currentDate);
          // console.log("currentTime:", currentTime);
          const postStatus = await postComment(Token, spotId, comment, currentDate, currentTime);
          // console.log("post comment result:", postStatus);
          if (postStatus) {
            fetchComments();
            setComment("");
          }
        } catch (error) {
          console.error("Error posting comment result:", error);
        }
      }
      await postNewComment();
      setKey((prev) => prev + 1);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleDelete = (commentId) => {
    // Delete the comment with the given ID
    // console.log("delete comment with ID: ", commentId);
    async function deleteCommentById() {
      try {
        const Token = getToken();
        const deleteStatus = await deleteComment(Token, spotId, commentId);
        // console.log("delete comment result:", deleteStatus);

        if (deleteStatus === 200) {
          // refetch comments and rerender
          fetchComments();
        }
      } catch (error) {
        console.error("Error deleting comment result:", error);
      }
    }
    deleteCommentById();
  };

  useEffect(() => {
    // console.log("render comment dialog for spotId: ", spotId);
    if (open) {
      fetchComments();
      fetchProfile();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={fullScreen ? "xs" : "sm"} fullWidth>
      <DialogTitle>
          {translate("board")} ({commentCnt})
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ position: "absolute", top: 0, right: 0 }}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Container maxWidth="sm" className="space-y-2" style={{ height: "300px", overflowY: "auto" }}>
          {commentList.map((message) => (
            <div
              key={message.comment_id}
              className={`flex flex-row items-center justify-between space-x-4 ${hoveredComment === message.comment_id ? "bg-gray-200" : ""}`}
              onMouseEnter={() => setHoveredComment(message.comment_id)}
              onMouseLeave={() => setHoveredComment(null)}>
              <div className="flex flex-row items-center space-x-2">
                <Avatar>{message.advisor_name[0]}</Avatar>
                <Typography variant="body2" color="text.secondary">
                  {" "}{message.advisor_name}{" "}
                </Typography>
                <Typography> {message.content} </Typography>
                <Typography variant="caption" color="text.secondary">
                  {" "}
                  {message.date.split("T")[0]} {message.time.split(":").slice(0, 2).join(":")}{" "}
                </Typography>
              </div>

              {hoveredComment === message.comment_id && (
                <IconButton onClick={() => handleDelete(message.comment_id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          ))}

          {/* <div className="flex flex-row items-center space-x-4">
              <div>
                  <Box className="flex flex-row items-center space-x-2">
                      <Avatar>A</Avatar>
                      <Typography variant="body2" color="text.secondary">
                          Abbie
                      </Typography>
                  </Box>
              </div>
              <div>
                  <Typography>
                      這個要不要改第二天去!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!這個要不要改第二天去!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!這個要不要改第二天去!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!這個要不要改第二天去!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!這個要不要改第二天去!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                  </Typography>
              </div>
          </div> */}
        </Container>

        <Container maxWidth="sm" className="space-y-4">
          <div className="flex flex-row items-center space-x-4">
            <div>
              <Tooltip title="You">
                <Avatar>{userName[0]}</Avatar>
              </Tooltip>
            </div>
            <div className="grow">
              <TextField key={key} label={translate("comment")} value={comment} onChange={handleCommentChange} fullWidth />
            </div>
            <div>
              <Button onClick={handleSubmit} variant="contained" color="primary" sx={{textTransform: 'none'}}>
                {translate("submit")}
              </Button>
            </div>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
