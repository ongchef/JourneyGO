import {
  getTripGroupDetailbyGroupID,
  updateTripGroupDetailbyGroupId,
  getTripGroupMember,
  deleteTripGroupMemberbyIds,
  getOverviewByGroupId,
  createInvitationModel,
  getTripGroupDays,
  getBillsByGroupId,
  getGroupMemberName,
  getUndoneBillsByGroupId,
  createBillModel,
  createShareBills,
  updateBillModel,
  deleteShareBillModel,
  getBillsByBillId,
} from "../models/tripgroupModel.js";
import {
  getuserIdbyClerkId,
  getInviteeIdByEmail,
  getuserNamebyClerkId,
} from "../models/userModel.js";

export const createInvitation = async (req, res) => {
  //如果沒有這些人或是群組的話
  console.log(req.body);
  const { inviteeEmail, groupId } = req.body;
  const clerkId = req.userID;
  console.log(inviteeEmail, groupId);
  try {
    let inviterId = await getuserIdbyClerkId(clerkId);
    console.log(inviterId);
    inviterId = inviterId[0].user_id;
    let inviteeId = await getInviteeIdByEmail(inviteeEmail);
    inviteeId = inviteeId.user_id

    const newInvitation = await createInvitationModel(
      inviterId,
      inviteeId,
      groupId
    );

    return res.status(201).json(newInvitation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getGroupOverview = async (req, res) => {
  const { groupId } = req.params;
  try {
    const data = await getOverviewByGroupId(groupId);
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot found overviews by given groupId." });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTripGroupDetail = async (req, res) => {
  const { groupId } = req.params;
  const verify = req.userID;
  console.log(verify);
  try {
    const data = await getTripGroupDetailbyGroupID(groupId);
    // no tripGroup found
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot found data by given groupId." });
    }
    //console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateTripGroupDetail = async (req, res) => {
  const userClerkId = req.userID;
  const { groupId, groupName, start_date, end_date } = req.body;
  try {
    //update 之前先 get get 看
    const data = await getTripGroupDetailbyGroupID(groupId);
    const user = await getTripGroupMember(groupId, userClerkId);
    // no tripGroup found
    if (data.length === 0) {
      console.log("Cannot found group by given groupId.");
      return res.status(404).json({
        message: "Update Failed. Cannot found data by given groupId.",
      });
    }
    // no user found
    if (user.length === 0) {
      console.log(
        "Cannot found user by given userId.",
        "Update Failed. User" + " not in group " + groupId
      );
      return res.status(404).json({
        message: "Update Failed. User" + " not in group " + groupId,
      });
    }
    const resdata = await updateTripGroupDetailbyGroupId(
      groupId,
      groupName,
      start_date,
      end_date
    );

    return res
      .status(200)
      .json({ ...resdata, message: "Update Successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTripGroupMember = async (req, res) => {
  const userClerkId = req.userID;
  const { groupId } = req.params;
  console.log(userClerkId, groupId);
  try {
    const data = await getTripGroupMember(groupId, userClerkId);
    if (data.length === 0) {
      console.log("user", " not in group", groupId);
      return res.status(404).json({
        message: "Delete Failed. User not in group " + groupId,
      });
    }

    const resdata = await deleteTripGroupMemberbyIds(groupId, data[0].u_id);

    return res.status(200).json({
      ...resdata,
      message:
        "user " + data[0].u_id + " leave group " + groupId + " successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// For test
export const getDate = async(req, res) => {
  const {groupId} = req.params
  const result = await getTripGroupDays(groupId)
  return res.json({ message:result})
}

export const getBills = async (req, res) => {
  const { groupId } = req.params;
  //console.log(groupId);
  try {
    const data = await getBillsByGroupId(groupId);
    //console.log(data);
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot find bills by given groupId." });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBillResult = async (req, res) => {
  const { groupId } = req.params;
  const userClerkId = req.userID;
  try {
    const members = await getGroupMemberName(groupId);

    const transactionsDict = {};
    const transactions = await getUndoneBillsByGroupId(groupId);

    transactions.forEach(transaction => {
      const payer = transaction.payer_name;
      const participant = transaction.user_name;
      let amount = transaction.amount;
    
      if (payer === participant) {
        return;
      }
      transactionsDict[payer] = transactionsDict[payer] || {};
      transactionsDict[payer][participant] = (transactionsDict[payer][participant] || 0) - amount;
    });
    
    let hasOffsetTransactions = true;
    while (hasOffsetTransactions) {
      hasOffsetTransactions = false;

      Object.keys(transactionsDict).forEach(payer => {
        Object.keys(transactionsDict[payer]).forEach(participant => {
          if (transactionsDict[participant] && transactionsDict[participant][payer]) {
            const offsetAmount = Math.min(transactionsDict[payer][participant], transactionsDict[participant][payer]);
            transactionsDict[payer][participant] -= offsetAmount;
            transactionsDict[participant][payer] -= offsetAmount;

            if (transactionsDict[payer][participant] === 0) {
              delete transactionsDict[payer][participant];
            }
            if (transactionsDict[participant][payer] === 0) {
              delete transactionsDict[participant][payer];
            }
            hasOffsetTransactions = true;
          }
        });
      });
    }
    // console.log(transactionsDict);

    // 初始化每个人的总收入和总支出
    const totalReceived = {};
    const totalPaid = {};

    // 遍历交易字典
    Object.keys(transactionsDict).forEach(payer => {
      Object.keys(transactionsDict[payer]).forEach(payee => {
        const amount = transactionsDict[payer][payee];
        // 计算每个人的总收入和总支出
        totalReceived[payee] = (totalReceived[payee] || 0) + amount;
        totalPaid[payer] = (totalPaid[payer] || 0) + amount;
      });
    });

    // 初始化每个人的总余额
    const balance = {};

    // 计算每个人欠其他人多少钱
    Object.keys(transactionsDict).forEach(payer => {
      Object.keys(transactionsDict[payer]).forEach(payee => {
        const amount = transactionsDict[payer][payee];
        balance[payee] = (balance[payee] || 0) + amount;
        balance[payer] = (balance[payer] || 0) - amount;
      });
    });

    //console.log("balance", balance);
    const result = [];

    Object.keys(transactionsDict).forEach(payer => {
      Object.keys(transactionsDict[payer]).forEach(payee => {
        const amount = transactionsDict[payer][payee];
        result.push({ payer, payee, amount });
      });
    });

    // console.log({ balance, transactions: result });
    const user_name = await getuserNamebyClerkId(userClerkId)
    //console.log(user_name);
    const user_balance = -balance[user_name[0].user_name]

    const data = {
      "balance": user_balance,
      "transactions": result
    }

    if (transactions.length === 0 || members.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot find overviews by given groupId." });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createBill = async (req, res) => {
  const { groupId } = req.params;
  const { bill_name, date, time, payer_id, participant, amount } = req.body;
  //console.log(bill_name, date, time, payer_id, participant, amount);
  try {
    const newBill = await createBillModel(bill_name, groupId, date, time, payer_id, amount);
    //console.log(newBill);
    const share_amount = -amount / (participant.length +1)
    const payer_amount = amount + share_amount
    const payer_bill = createShareBills(newBill.bill_id, payer_id, payer_amount)
    participant.forEach(p => {
      const share_bill = createShareBills(newBill.bill_id, p, share_amount)
    })
    return res.status(201).json(newBill);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBill = async (req, res) => {
  const { groupId, transactionId } = req.params;
  const { bill_name, date, time, payer_id, participant, amount } = req.body;
  //console.log(bill_name, date, time, payer_id, participant, amount);
  try {
    const updatedBill = await updateBillModel(transactionId, bill_name, date, time, payer_id, amount);
    //console.log(newBill);
    //先刪掉所有之前的share_bill再重新插入新的
    const del = await deleteShareBillModel(transactionId)
    const share_amount = -amount / (participant.length +1)
    const payer_amount = amount + share_amount
    const payer_bill = createShareBills(transactionId, payer_id, payer_amount)
    participant.forEach(p => {
      const share_bill = createShareBills(transactionId, p, share_amount)
    })
    return res.status(201).json({ message: "update bill succeed"});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBillDetail = async (req, res) => {
  const { groupId, transactionId } = req.params;
  //console.log(groupId, transactionId);
  try {
    const data = await getBillsByBillId(transactionId);
    //console.log(data);
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot find bills by given groupId." });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};