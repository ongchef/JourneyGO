import {
  updateTripGroupDetail,
  getTripGroupDetail,
  getGroupOverview,
  createInvitation,
  getBills,
  getBillResult,
  createBill,
  updateBill,
  getBillDetail,
  writeBill,
  deleteTripGroupMember,
  getComments,
  createComment,
  deleteComment,
} from "../controllers/tripgroup";
import {
  getuserIdbyClerkId,
  getInviteeIdByEmail,
  getuserNamebyClerkId,
  getuserIdbyName,
} from "../models/userModel"; // replace with actual path
import {
  getGroupMemberName,
  getTripGroupDetailbyGroupID,
  getTripGroupMember,
  updateTripGroupDetailbyGroupId,
  getOverviewByGroupId,
  createInvitationModel,
  getBillsByGroupId,
  getUndoneBillsByGroupId,
  createBillModel,
  createShareBills,
  updateBillModel,
  deleteShareBillModel,
  getBillsByBillId,
  deleteTripGroupMemberbyIds,
  getCommentsBySpotId,
  createCommentModel,
  deleteCommentModel,
} from "../models/tripgroupModel"; // replace with actual path
jest.mock("../models/userModel");
jest.mock("../models/tripgroupModel");

// createInvitation
describe("createInvitation", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      userID: "testUserId",
      body: {
        inviteeEmail: ["testEmail1", "testEmail2"],
        groupId: "testGroupId",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 201 status when invitations are successfully created", async () => {
    const mockData = [{ user_id: "testUserId", user_name: "testUserName" }];
    getuserIdbyClerkId.mockImplementation(() => Promise.resolve(mockData));
    getInviteeIdByEmail.mockImplementation(() => Promise.resolve(mockData[0]));
    createInvitationModel.mockImplementation(() => Promise.resolve());

    await createInvitation(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith([
      mockData[0].user_name,
      mockData[0].user_name,
    ]);
  });

  it("should return 500 status when an error occurs", async () => {
    const mockError = new Error("testError");
    getuserIdbyClerkId.mockImplementation(() => Promise.reject(mockError));

    await createInvitation(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// getGroupOverview
describe("getGroupOverview", () => {
  it("should return group overview and status 200", async () => {
    const mockReq = {
      params: {
        groupId: "testGroupId",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockData = [{ id: "testId", name: "testName" }];
    getOverviewByGroupId.mockResolvedValue(mockData);
    await getGroupOverview(mockReq, mockRes);
    expect(getOverviewByGroupId).toHaveBeenCalledWith(mockReq.params.groupId);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockData);
  });

  it("should return status 404 if no data found", async () => {
    const mockReq = {
      params: {
        groupId: "testGroupId",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getOverviewByGroupId.mockResolvedValue([]);

    await getGroupOverview(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Cannot found overviews by given groupId.",
    });
  });
});

// getTripGroupDetail
describe("getTripGroupDetail", () => {
  it("should return group detail and status 200", async () => {
    const mockReq = {
      params: {
        groupId: "testGroupId",
      },
      userID: "testUserId",
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockData = [{ id: "testId", name: "testName" }];

    getTripGroupDetailbyGroupID.mockResolvedValue(mockData);

    await getTripGroupDetail(mockReq, mockRes);

    expect(getTripGroupDetailbyGroupID).toHaveBeenCalledWith(
      mockReq.params.groupId
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockData);
  });

  it("should return status 404 if no data found", async () => {
    const mockReq = {
      params: {
        groupId: "testGroupId",
      },
      userID: "testUserId",
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getTripGroupDetailbyGroupID.mockResolvedValue([]);

    await getTripGroupDetail(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Cannot found data by given groupId.",
    });
  });
});

// updateTripGroupDetail
describe("updateTripGroupDetail", () => {
  it("should update group detail and return status 200", async () => {
    const mockReq = {
      body: {
        groupId: "testGroupId",
        groupName: "testGroupName",
        start_date: "testStartDate",
        end_date: "testEndDate",
      },
      userID: "testUserId",
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockData = [{ id: "testId", name: "testName" }];
    const mockUser = [{ id: "testUserId", name: "testUserName" }];
    const mockUpdateData = { id: "testId", name: "testName" };

    getTripGroupDetailbyGroupID.mockResolvedValue(mockData);
    getTripGroupMember.mockResolvedValue(mockUser);
    updateTripGroupDetailbyGroupId.mockResolvedValue(mockUpdateData);

    await updateTripGroupDetail(mockReq, mockRes);

    expect(getTripGroupDetailbyGroupID).toHaveBeenCalledWith(
      mockReq.body.groupId
    );
    expect(getTripGroupMember).toHaveBeenCalledWith(
      mockReq.body.groupId,
      mockReq.userID
    );
    expect(updateTripGroupDetailbyGroupId).toHaveBeenCalledWith(
      mockReq.body.groupId,
      mockReq.body.groupName,
      mockReq.body.start_date,
      mockReq.body.end_date
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      ...mockUpdateData,
      message: "Update Successfully.",
    });
  });

  it("should return status 404 if no group found", async () => {
    const mockReq = {
      body: {
        groupId: "testGroupId",
        groupName: "testGroupName",
        start_date: "testStartDate",
        end_date: "testEndDate",
      },
      userID: "testUserId",
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getTripGroupDetailbyGroupID.mockResolvedValue([]);

    await updateTripGroupDetail(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Update Failed. Cannot found data by given groupId.",
    });
  });

  it("should return status 404 if no user found", async () => {
    const mockReq = {
      body: {
        groupId: "testGroupId",
        groupName: "testGroupName",
        start_date: "testStartDate",
        end_date: "testEndDate",
      },
      userID: "testUserId",
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockData = [{ id: "testId", name: "testName" }];

    getTripGroupDetailbyGroupID.mockResolvedValue(mockData);
    getTripGroupMember.mockResolvedValue([]);

    await updateTripGroupDetail(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Update Failed. User not in group " + mockReq.body.groupId,
    });
  });
});

// deleteTripGroupMember
describe("deleteTripGroupMember", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      userID: "testUserId",
      params: {
        groupId: "testGroupId",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 404 status when user is not in group", async () => {
    getTripGroupMember.mockImplementation(() => Promise.resolve([]));

    await deleteTripGroupMember(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Delete Failed. User not in group " + mockReq.params.groupId,
    });
  });

  it("should return 200 status when user is successfully removed from group", async () => {
    const mockData = [{ u_id: "testUserId" }];
    const mockResData = { test: "test" };
    getTripGroupMember.mockImplementation(() => Promise.resolve(mockData));
    deleteTripGroupMemberbyIds.mockImplementation(() =>
      Promise.resolve(mockResData)
    );

    await deleteTripGroupMember(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      ...mockResData,
      message:
        "user " +
        mockData[0].u_id +
        " leave group " +
        mockReq.params.groupId +
        " successfully",
    });
  });

  it("should return 500 status when an error occurs", async () => {
    const mockError = new Error("testError");
    getTripGroupMember.mockImplementation(() => Promise.reject(mockError));

    await deleteTripGroupMember(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// getBills
describe("getBills", () => {
  it("should return bills and status 200", async () => {
    const mockReq = {
      params: {
        groupId: "testGroupId",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockData = [{ id: "testId", name: "testName" }];

    getBillsByGroupId.mockResolvedValue(mockData);

    await getBills(mockReq, mockRes);

    expect(getBillsByGroupId).toHaveBeenCalledWith(mockReq.params.groupId);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockData);
  });

  it("should return status 404 if no data found", async () => {
    const mockReq = {
      params: {
        groupId: "testGroupId",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getBillsByGroupId.mockResolvedValue([]);

    await getBills(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Cannot find bills by given groupId.",
    });
  });
});

// getBillResult
describe("getBillResult", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      userID: "testUserId",
      params: {
        groupId: "testGroupId",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 200 status when bill results are successfully retrieved", async () => {
    const mockMembers = [{ user_id: "testUserId", user_name: "testUserName" }];
    const mockTransactions = [
      { payer_name: "testPayerName", user_name: "testUserName", amount: -100 },
    ];
    getGroupMemberName.mockImplementation(() => Promise.resolve(mockMembers));
    getUndoneBillsByGroupId.mockImplementation(() =>
      Promise.resolve(mockTransactions)
    );
    getuserIdbyName.mockImplementation(() => Promise.resolve(mockMembers));
    getuserNamebyClerkId.mockImplementation(() => Promise.resolve(mockMembers));

    await getBillResult(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      balance: -100,
      transactions: [
        {
          payer: "testPayerName",
          payee: "testUserName",
          amount: 100,
          payer_id: "testUserId",
          payee_id: "testUserId",
        },
      ],
    });
  });

  it("should return 404 status when no transactions or members are found", async () => {
    getGroupMemberName.mockImplementation(() => Promise.resolve([]));
    getUndoneBillsByGroupId.mockImplementation(() => Promise.resolve([]));

    await getBillResult(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Cannot find overviews by given groupId.",
    });
  });

  it("should return 500 status when an error occurs", async () => {
    const mockError = new Error("testError");
    getGroupMemberName.mockImplementation(() => Promise.reject(mockError));

    await getBillResult(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// createBill
describe("createBill", () => {
  it("should create a bill and return status 201", async () => {
    const mockReq = {
      params: {
        groupId: "testGroupId",
      },
      body: {
        bill_name: "testBill",
        date: "2022-01-01",
        time: "12:00",
        payer_id: "testPayerId",
        participant: ["testParticipantId1", "testParticipantId2"],
        amount: 300,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNewBill = { bill_id: "testBillId", ...mockReq.body };

    createBillModel.mockResolvedValue(mockNewBill);
    createShareBills.mockResolvedValue();

    await createBill(mockReq, mockRes);

    expect(createBillModel).toHaveBeenCalledWith(
      mockReq.body.bill_name,
      mockReq.params.groupId,
      mockReq.body.date,
      mockReq.body.time,
      mockReq.body.payer_id,
      mockReq.body.amount,
      "open"
    );
    expect(createShareBills).toHaveBeenCalledTimes(
      mockReq.body.participant.length + 1
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockNewBill);
  });
});

// updateBill
describe("updateBill", () => {
  it("should update a bill and return status 201", async () => {
    const mockReq = {
      params: {
        groupId: "testGroupId",
        transactionId: "testTransactionId",
      },
      body: {
        bill_name: "testBill",
        date: "2022-01-01",
        time: "12:00",
        payer_id: "testPayerId",
        participant: ["testParticipantId1", "testParticipantId2"],
        amount: 300,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    updateBillModel.mockResolvedValue();
    deleteShareBillModel.mockResolvedValue();
    createShareBills.mockResolvedValue();

    await updateBill(mockReq, mockRes);

    expect(updateBillModel).toHaveBeenCalledWith(
      mockReq.params.transactionId,
      mockReq.body.bill_name,
      mockReq.body.date,
      mockReq.body.time,
      mockReq.body.payer_id,
      mockReq.body.amount
    );
    expect(deleteShareBillModel).toHaveBeenCalledWith(
      mockReq.params.transactionId
    );

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "update bill succeed",
    });
  });
});

// getBillDetail
describe("getBillDetail", () => {
  it("should return bill detail and status 200", async () => {
    const mockReq = {
      params: {
        groupId: "testGroupId",
        transactionId: "testTransactionId",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockData = [{ id: "testId", name: "testName" }];

    getBillsByBillId.mockResolvedValue(mockData);

    await getBillDetail(mockReq, mockRes);

    expect(getBillsByBillId).toHaveBeenCalledWith(mockReq.params.transactionId);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockData);
  });

  it("should return status 404 if no data found", async () => {
    const mockReq = {
      params: {
        groupId: "testGroupId",
        transactionId: "testTransactionId",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getBillsByBillId.mockResolvedValue([]);

    await getBillDetail(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Cannot find bills by given groupId.",
    });
  });
});

// writeBill
describe("writeBill", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        groupId: "testGroupId",
      },
      body: {
        date: "testDate",
        time: "testTime",
        creditor_id: "testCreditorId",
        debtor_id: "testDebtorId",
        amount: "testAmount",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // it("should return success message when writeBill is successful", async () => {
  //   const mockBill = { bill_id: "testBillId" };
  //   createBillModel.mockImplementation(() => Promise.resolve(mockBill));
  //   createShareBills.mockImplementation(() => Promise.resolve());

  //   await writeBill(mockReq, mockRes);

  //   expect(mockRes.status).toHaveBeenCalledWith(201);
  //   expect(mockRes.json).toHaveBeenCalledWith({
  //     message: "update bill succeed",
  //   });
  // });

  it("should return error when writeBill fails", async () => {
    const mockError = new Error("payer_id is not defined");
    createBillModel.mockImplementation(() => Promise.reject(mockError));

    await writeBill(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// getComments
describe("getComments", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        spotId: "testSpotId",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 200 status and an empty array when no comments are found", async () => {
    getCommentsBySpotId.mockImplementation(() => Promise.resolve([]));

    await getComments(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([]);
  });

  it("should return 200 status and comments when comments are found", async () => {
    const mockComments = [{ comment: "testComment" }];
    getCommentsBySpotId.mockImplementation(() => Promise.resolve(mockComments));

    await getComments(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockComments);
  });

  it("should return 500 status when an error occurs", async () => {
    const mockError = new Error("testError");
    getCommentsBySpotId.mockImplementation(() => Promise.reject(mockError));

    await getComments(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// createComment
describe("createComment", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        spotId: "testSpotId",
      },
      body: {
        comment_text: "testComment",
        date: "2022-01-01",
        time: "12:00",
      },
      userID: "testClerkId",
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a new comment and return 201 status", async () => {
    getuserIdbyClerkId.mockImplementation(() =>
      Promise.resolve([{ user_id: "testUserId" }])
    );
    createCommentModel.mockImplementation(() => Promise.resolve("newComment"));

    await createComment(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "create Comment Success",
    });
  });

  it("should return 500 status when an error occurs", async () => {
    const mockError = new Error("testError");
    getuserIdbyClerkId.mockImplementation(() => Promise.reject(mockError));

    await createComment(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// deleteComment
describe("deleteComment", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        spotId: "testSpotId",
        commentId: "testCommentId",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should delete a comment and return 200 status", async () => {
    deleteCommentModel.mockImplementation(() => Promise.resolve());

    await deleteComment(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "delete Comment Success",
    });
  });

  it("should return 500 status when an error occurs", async () => {
    const mockError = new Error("testError");
    deleteCommentModel.mockImplementation(() => Promise.reject(mockError));

    await deleteComment(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});
