import {
  getSpots,
  createSpot,
  updateSpot,
  deleteSpot,
  searchNearby,
  searchPlace,
  constructRoute,
} from "../controllers/spot.js";
import { findNearby, findPlace, getRoute } from "../services/map.js";
import {
  getSpotByGroupIdDay,
  getSpotBySpotId,
  createSpotByGroupId,
  updateSpotBySpotId,
  deleteSpotBySpotId,
  getLocationBySpotId,
} from "../models/spotModel.js";
import { getTripGroupMember } from "../models/tripgroupModel.js";
import {
  getTransByGroupIdDay,
  saveTransportation,
} from "../models/transportationModel.js";

jest.mock("../models/spotModel.js");
jest.mock("../models/tripgroupModel.js");
jest.mock("../models/transportationModel.js");
jest.mock("../services/map.js");

// getSpots
describe("getSpots", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        groupId: "testGroupId",
        day: "testDay",
      },
      userID: "testUserID",
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return error when user is not in group", async () => {
    getTripGroupMember.mockImplementation(() => Promise.resolve([]));

    await getSpots(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User not in group.",
    });
  });

  it("should return data when getSpotByGroupIdDay and getTransByGroupIdDay are successful", async () => {
    const mockUser = [{ id: "testUserID" }];
    const mockSpots = [{ id: "testSpotID" }];
    const mockRoutes = [{ id: "testRouteID" }];
    getTripGroupMember.mockImplementation(() => Promise.resolve(mockUser));
    getSpotByGroupIdDay.mockImplementation(() => Promise.resolve(mockSpots));
    getTransByGroupIdDay.mockImplementation(() => Promise.resolve(mockRoutes));

    await getSpots(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      spots: mockSpots,
      transportation: mockRoutes,
    });
  });

  it("should return error when getSpotByGroupIdDay or getTransByGroupIdDay fails", async () => {
    const mockError = new Error("testError");
    getTripGroupMember.mockImplementation(() =>
      Promise.resolve([{ id: "testUserID" }])
    );
    getSpotByGroupIdDay.mockImplementation(() => Promise.reject(mockError));

    await getSpots(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// createSpot
describe("createSpot", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        groupId: "testGroupId",
        day: "testDay",
      },
      body: {
        spotName: "testSpotName",
        description: "testDescription",
        location: "testLocation",
        lat: "testLat",
        lon: "testLon",
        sequence: "testSequence",
      },
      userID: "testUserID",
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return error when user is not in group", async () => {
    getTripGroupMember.mockImplementation(() => Promise.resolve([]));

    await createSpot(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User not in group.",
    });
  });

  it("should return error when spot already exists", async () => {
    const mockUser = [{ id: "testUserID" }];
    const mockSpots = [{ spot_name: "testSpotName" }];
    getTripGroupMember.mockImplementation(() => Promise.resolve(mockUser));
    getSpotByGroupIdDay.mockImplementation(() => Promise.resolve(mockSpots));

    await createSpot(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Spot already add." });
  });

  it("should return new spot when createSpotByGroupId is successful", async () => {
    const mockUser = [{ id: "testUserID" }];
    const mockSpots = [{ spot_name: "differentSpotName" }];
    const mockNewSpot = { id: "newSpotID" };
    getTripGroupMember.mockImplementation(() => Promise.resolve(mockUser));
    getSpotByGroupIdDay.mockImplementation(() => Promise.resolve(mockSpots));
    createSpotByGroupId.mockImplementation(() => Promise.resolve(mockNewSpot));

    await createSpot(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockNewSpot);
  });
});

// updateSpot
describe("updateSpot", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        groupId: "testGroupId",
        day: "testDay",
      },
      body: {
        spotId: "testSpotId",
        sequence: "testSequence",
      },
      userID: "testUserID",
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return error when user is not in group", async () => {
    getTripGroupMember.mockImplementation(() => Promise.resolve([]));

    await updateSpot(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User not in group.",
    });
  });

  it("should return error when spot does not exist", async () => {
    const mockUser = [{ id: "testUserID" }];
    getTripGroupMember.mockImplementation(() => Promise.resolve(mockUser));
    getSpotBySpotId.mockImplementation(() => Promise.resolve([]));

    await updateSpot(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Cannot found data by given groupId/day.",
    });
  });

  it("should return updated spot when updateSpotBySpotId is successful", async () => {
    const mockUser = [{ id: "testUserID" }];
    const mockSpots = [{ id: "testSpotId" }];
    const mockUpdatedSpot = { id: "updatedSpotID" };
    getTripGroupMember.mockImplementation(() => Promise.resolve(mockUser));
    getSpotBySpotId.mockImplementation(() => Promise.resolve(mockSpots));
    updateSpotBySpotId.mockImplementation(() =>
      Promise.resolve(mockUpdatedSpot)
    );

    await updateSpot(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedSpot);
  });
});

// deleteSpot

describe("deleteSpot", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        groupId: "testGroupId",
        day: "testDay",
        spotId: "testSpotId",
      },
      userID: "testUserID",
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return error when user is not in group", async () => {
    getTripGroupMember.mockImplementation(() => Promise.resolve([]));

    await deleteSpot(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User not in group.",
    });
  });

  it("should return error when spot does not exist", async () => {
    const mockUser = [{ id: "testUserID" }];
    getTripGroupMember.mockImplementation(() => Promise.resolve(mockUser));
    getSpotBySpotId.mockImplementation(() => Promise.resolve([]));

    await deleteSpot(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Cannot found data by given groupId/day.",
    });
  });

  it("should return message when deleteSpotBySpotId is successful", async () => {
    const mockUser = [{ id: "testUserID" }];
    const mockSpots = [{ id: "testSpotId" }];
    getTripGroupMember.mockImplementation(() => Promise.resolve(mockUser));
    getSpotBySpotId.mockImplementation(() => Promise.resolve(mockSpots));
    deleteSpotBySpotId.mockImplementation(() =>
      Promise.resolve({ rowCount: 1 })
    );

    await deleteSpot(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Delete successfully.",
    });
  });

  it("should return error when deleteSpotBySpotId fails", async () => {
    const mockError = new Error("testError");
    getTripGroupMember.mockImplementation(() =>
      Promise.resolve([{ id: "testUserID" }])
    );
    getSpotBySpotId.mockImplementation(() =>
      Promise.resolve([{ id: "testSpotId" }])
    );
    deleteSpotBySpotId.mockImplementation(() => Promise.reject(mockError));

    await deleteSpot(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// searchNearby
describe("searchNearby", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        query: "testQuery",
        spotId: "testSpotId",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return error when no location found", async () => {
    getLocationBySpotId.mockImplementation(() => Promise.resolve(null));

    await searchNearby(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "No nearby" });
  });

  it("should return error when no spot found", async () => {
    const mockLoc = { lon: "testLon", lat: "testLat" };
    getLocationBySpotId.mockImplementation(() => Promise.resolve(mockLoc));
    findNearby.mockImplementation(() => Promise.resolve([]));

    await searchNearby(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      messageS: "Cannot found any spot.",
    });
  });

  it("should return spots when findNearby is successful", async () => {
    const mockLoc = { lon: "testLon", lat: "testLat" };
    const mockSpots = [{ id: "testSpotId" }];
    getLocationBySpotId.mockImplementation(() => Promise.resolve(mockLoc));
    findNearby.mockImplementation(() => Promise.resolve(mockSpots));

    await searchNearby(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockSpots);
  });

  it("should return error when findNearby fails", async () => {
    const mockError = new Error("testError");
    getLocationBySpotId.mockImplementation(() =>
      Promise.resolve({ lon: "testLon", lat: "testLat" })
    );
    findNearby.mockImplementation(() => Promise.reject(mockError));

    await searchNearby(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// searchPlace
describe("searchPlace", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        query: "testQuery",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return error when no spot found", async () => {
    findPlace.mockImplementation(() => Promise.resolve([]));

    await searchPlace(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Cannot found any spot.",
    });
  });

  it("should return spots when findPlace is successful", async () => {
    const mockSpots = [{ id: "testSpotId" }];
    findPlace.mockImplementation(() => Promise.resolve(mockSpots));

    await searchPlace(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockSpots);
  });

  it("should return error when findPlace fails", async () => {
    const mockError = new Error("testError");
    findPlace.mockImplementation(() => Promise.reject(mockError));

    await searchPlace(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});

// constructRoute

describe("constructRoute", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        groupId: "testGroupId",
        day: "testDay",
        transType: "testTransType",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 400 status when no spot is found", async () => {
    getRoute.mockImplementation(() => Promise.resolve(undefined));

    await constructRoute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "No Spot" });
  });

  it("should return 205 status when available travel modes are found", async () => {
    const mockResult = { available_travel_modes: ["testMode"] };
    getRoute.mockImplementation(() => Promise.resolve(mockResult));

    await constructRoute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(205);
    expect(mockRes.json).toHaveBeenCalledWith({
      available_travel_modes: mockResult.available_travel_modes,
    });
  });

  it("should return 200 status when route is successfully constructed", async () => {
    const mockResult = { test: "test" };
    getRoute.mockImplementation(() => Promise.resolve(mockResult));
    saveTransportation.mockImplementation(() => Promise.resolve());

    await constructRoute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResult);
  });

  it("should return 500 status when an error occurs", async () => {
    const mockError = new Error("testError");
    getRoute.mockImplementation(() => Promise.reject(mockError));

    await constructRoute(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: mockError.message });
  });
});
