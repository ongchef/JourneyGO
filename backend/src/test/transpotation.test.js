import { getTransportation } from "../controllers/transportation.js";
import { getTransByGroupIdDay } from "../models/transportationModel.js";

jest.mock("../models/transportationModel.js");

describe("getTransportation", () => {
  let mockReq, mockRes;
  beforeEach(() => {
    mockReq = {
      params: {
        groupId: "testGroupId",
        day: "testDay",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return data when getTransByGroupIdDay is successful", async () => {
    const mockData = { data: "testData" };
    getTransByGroupIdDay.mockImplementation(() => Promise.resolve(mockData));

    await getTransportation(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockData);
  });

  it("should return error when getTransByGroupIdDay fails", async () => {
    const mockError = new Error("testError");
    getTransByGroupIdDay.mockImplementation(() => Promise.reject(mockError));

    await getTransportation(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});
