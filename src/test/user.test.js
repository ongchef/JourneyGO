import { getGroup } from "../controllers/users.js";
import { getuserIdbyClerkId, getGroupByUserId } from "../models/userModel"; // replace with your actual model file

jest.mock("../models/userModel"); // replace with your actual model file

describe("getGroup", () => {
  it("should return the correct groups", async () => {
    const mockClerkId = "user_2exRJkkCX2esDWArwBs1oskcTbg";
    const mockReq = {
      userID: mockClerkId,
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockUserId = [{ user_id: 37 }]; // 修改為你希望的 userId
    const mockData = [
      // 修改為你希望的 data
      {
        group_id: 14,
        group_name: "首爾六日遊！——我要去看演唱會！",
        start_date: "2024-04-24T16:00:00.000Z",
        end_date: "2024-04-29T16:00:00.000Z",
        status: "incoming",
      },
      {
        group_id: 69,
        group_name: "香港澳門吃蛋塔",
        start_date: "2024-10-09T16:00:00.000Z",
        end_date: "2024-10-16T16:00:00.000Z",
        status: "Incoming",
      },
      {
        group_id: 15,
        group_name: "沖繩沖繩沖繩畢旅",
        start_date: "2024-06-13T16:00:00.000Z",
        end_date: "2024-06-17T16:00:00.000Z",
        status: "incoming",
      },
    ];

    getuserIdbyClerkId.mockResolvedValue(mockUserId);
    getGroupByUserId.mockResolvedValue(mockData);

    await getGroup(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockData);
  });

  it("should return 200 and an empty array when no group is found", async () => {
    const mockClerkId = "user_2fBGinmHVTarbbOjP8Js5oxplul";
    const mockReq = {
      userID: mockClerkId,
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockUserId = [{ user_id: "64" }];

    getuserIdbyClerkId.mockResolvedValue(mockUserId);
    getGroupByUserId.mockResolvedValue([]);

    await getGroup(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith([]);
  });

  it("should return 500 when an error occurs", async () => {
    const mockClerkId = "testClerkId";
    const mockReq = {
      userID: mockClerkId,
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockError = new Error("Test error");

    getuserIdbyClerkId.mockRejectedValue(mockError);

    await getGroup(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// createGroup
import { createGroup } from "../controllers/users.js";
import { createGroupModel, getInviteeIdByEmail } from "../models/userModel.js"; // replace with actual path
import { createInvitationModel } from "../models/tripgroupModel.js";

jest.mock("../models/tripgroupModel.js");
jest.mock("../models/userModel.js");

describe("createGroup", () => {
  it("should create a group and return it", async () => {
    const mockReq = {
      userID: "testClerkId",
      body: {
        groupName: "Test Group",
        countries: ["臺灣"],
        inviteeEmail: "test@example.com",
        startDate: "2022-01-01",
        endDate: "2022-12-31",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockUserId = [{ user_id: 37 }];
    const mockNewGroup = { id: "testGroupId", name: "Test Group" };
    const mockInviteeId = { user_id: 38 };

    getuserIdbyClerkId.mockResolvedValue(mockUserId);
    createGroupModel.mockResolvedValue(mockNewGroup);
    getInviteeIdByEmail.mockResolvedValue(mockInviteeId);
    createInvitationModel.mockResolvedValue();

    await createGroup(mockReq, mockRes);

    expect(getuserIdbyClerkId).toHaveBeenCalledWith(mockReq.userID);
    expect(createGroupModel).toHaveBeenCalledWith(
      mockUserId[0].user_id,
      mockReq.body.groupName,
      mockReq.body.countries,
      mockReq.body.startDate,
      mockReq.body.endDate
    );
    expect(getInviteeIdByEmail).toHaveBeenCalledWith(mockReq.body.inviteeEmail);
    expect(createInvitationModel).toHaveBeenCalledWith(
      mockUserId[0].user_id,
      mockInviteeId.user_id,
      mockNewGroup
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockNewGroup);
  });

  it("should return 500 if an error occurs", async () => {
    const mockReq = {
      userID: "testClerkId",
      body: {
        groupName: "Test Group",
        countries: ["臺灣"],
        inviteeEmail: "test@example.com",
        startDate: "2022-01-01",
        endDate: "2022-12-31",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getuserIdbyClerkId.mockRejectedValue(new Error("Test error"));

    await createGroup(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Test error" });
  });
});

// getInvitation
import { getInvitation } from "../controllers/users.js";
import { getInvitationByUserId } from "../models/userModel.js"; // replace with actual path

describe("getInvitation", () => {
  it("should return invitations for a given user", async () => {
    const mockReq = {
      userID: "testClerkId",
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockUserId = [{ user_id: 37 }];
    const mockInvitations = [
      {
        inviter_name: "joey",
        group_name: "首爾六日遊！——我要去看演唱會！",
        invitation_id: 23,
        status: "accepted",
      },
      {
        inviter_name: "needy",
        group_name: "香港澳門吃蛋塔",
        invitation_id: 65,
        status: "accepted",
      },
      {
        inviter_name: "jacky",
        group_name: "沖繩沖繩沖繩畢旅",
        invitation_id: 66,
        status: "accepted",
      },
      {
        inviter_name: "jacky",
        group_name: "沖繩沖繩沖繩畢旅",
        invitation_id: 67,
        status: "accepted",
      },
      {
        inviter_name: "jacky",
        group_name: "沖繩沖繩沖繩畢旅",
        invitation_id: 29,
        status: "accepted",
      },
    ];

    getuserIdbyClerkId.mockResolvedValue(mockUserId);
    getInvitationByUserId.mockResolvedValue(mockInvitations);

    await getInvitation(mockReq, mockRes);

    expect(getuserIdbyClerkId).toHaveBeenCalledWith(mockReq.userID);
    expect(getInvitationByUserId).toHaveBeenCalledWith(mockUserId[0].user_id);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockInvitations);
  });

  it("should return 404 if no invitations are found", async () => {
    const mockReq = {
      userID: "testClerkId",
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockUserId = [{ user_id: 37 }];

    getuserIdbyClerkId.mockResolvedValue(mockUserId);
    getInvitationByUserId.mockResolvedValue([]);

    await getInvitation(mockReq, mockRes);

    expect(getuserIdbyClerkId).toHaveBeenCalledWith(mockReq.userID);
    expect(getInvitationByUserId).toHaveBeenCalledWith(mockUserId[0].user_id);
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Cannot found invitations by given userId.",
    });
  });

  it("should return 500 if an error occurs", async () => {
    const mockReq = {
      userID: "testClerkId",
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    getuserIdbyClerkId.mockRejectedValue(new Error("Test error"));

    await getInvitation(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Test error" });
  });
});

// putInvitation
import { putInvitation } from "../controllers/users.js";
import { updateInvitation } from "../models/userModel.js"; // replace with actual path

describe("putInvitation", () => {
  it("should update an invitation and return it", async () => {
    const mockReq = {
      params: {
        invitationId: "testInvitationId",
      },
      body: {
        status: "accepted",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockUpdatedInvitation = {
      id: "testInvitationId",
      status: "accepted",
    };

    updateInvitation.mockResolvedValue(mockUpdatedInvitation);

    await putInvitation(mockReq, mockRes);

    expect(updateInvitation).toHaveBeenCalledWith(
      mockReq.params.invitationId,
      mockReq.body.status
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedInvitation);
  });

  it("should return 400 if status is not valid", async () => {
    const mockReq = {
      params: {
        invitationId: "testInvitationId",
      },
      body: {
        status: "invalid",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await putInvitation(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "status need to be accepted, pending, or rejected.",
    });
  });

  it("should return 500 if an error occurs", async () => {
    const mockReq = {
      params: {
        invitationId: "testInvitationId",
      },
      body: {
        status: "accepted",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    updateInvitation.mockRejectedValue(new Error("Test error"));

    await putInvitation(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Test error" });
  });
});

import { registerUser } from "../controllers/users.js";
import { addNewUser } from "../models/userModel.js"; // replace with actual path
import { Webhook } from "svix"; // replace with actual path
jest.mock("svix"); // replace with actual path

describe("registerUser", () => {
  it("should register a user and return success message", async () => {
    const mockReq = {
      headers: {
        "svix-id": "testSvixId",
        "svix-timestamp": "testSvixTimestamp",
        "svix-signature": "testSvixSignature",
      },
      body: {
        data: {
          id: "testUserId",
          email_addresses: [{ email_address: "testEmail" }],
          username: "testUsername",
        },
        type: "testType",
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockWebhook = {
      verify: jest.fn().mockReturnValue(mockReq.body),
    };

    Webhook.mockImplementation(() => mockWebhook);

    await registerUser(mockReq, mockRes);

    expect(mockWebhook.verify).toHaveBeenCalledWith(mockReq.body, {
      "svix-id": mockReq.headers["svix-id"],
      "svix-timestamp": mockReq.headers["svix-timestamp"],
      "svix-signature": mockReq.headers["svix-signature"],
    });
    expect(addNewUser).toHaveBeenCalledWith({
      userID: mockReq.body.data.id,
      userEmail: mockReq.body.data.email_addresses[0].email_address,
      userName: mockReq.body.data.username,
      status: "Active",
    });
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: "User successfully registered",
    });
  });
});
