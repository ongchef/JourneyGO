'use client';

import { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { deleteSpots } from '@/services/deleteSpots';
import { DataContext } from '@/app/components/dataContext';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { getToken } from '@/utils/getToken';

const ItemTypes = {CARD: 'card',}

export const DndCard = ({ id, index, title, location, moveCard }) => {
  const { currGroupId, currDay, setAllSpots, setRefetch } = useContext(DataContext);

  // Drag and Drop
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  
  // Delete spot
  const handleClick = () => {
    async function del(Token) {
      try {
        const status = await deleteSpots(Token, currGroupId, currDay, id);
        if (status === 204 || status === 200) {  
          setAllSpots(prevState => {  // delete spot from allSpots
            const newSpots = prevState?.[currGroupId]?.[currDay]?.filter(spot => spot?.id !== id);
            return {
              ...prevState,
              [currGroupId]: {
                ...prevState[currGroupId] || {},
                [currDay]: newSpots,
              },
            };
          });
          // setRefetch((prev) => prev + 1);  // refetch
        }
      } catch (e) {
        console.error(e);
      }
    };
    const Token = getToken();
    del(Token);
  }

  return (
    <div ref={ref} data-handler-id={handlerId} className='shadow bg-white p-3 rounded-md'>
      <div className='flex justify-between'>
        <Typography variant='inherit'>{title}</Typography>
        <div className='flex gap-2'>
          <CommentIcon />
          <ThumbUpOffAltIcon />
          <Button variant='outlined' onClick={handleClick}>刪除</Button>
        </div>
      </div>
      <Typography variant='caption'>{location}</Typography>
    </div>
  )
}