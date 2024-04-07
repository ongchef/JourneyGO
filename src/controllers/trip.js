import {
    getGroupByUserId,
    createGroup,
    createInvitation,
    getOverviewByGroupId,
    getInvitationByUserId,
    updateInvitation
} from "../models/tripModel.js";

export const getGroup = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await getGroupByUserId(userId);

        // no spot found
        if (data.length === 0){
            return res.status(404).json({ message: "Cannot found groups by given userId."});
        }
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const createGroup = async (req, res) => {
    const {userId, groupName, startDate, endDate} = req.body;
    try {
        const newGroup = await createGroup(userId, groupName, startDate, endDate);

        return res.status(201).json(newGroup);
    }catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const createInvitation = async (req, res) => {
    const {inviterId, inviteeId, groupId} = req.body;
    try {
        const newGroup = await createInvitation(inviterId, inviteeId, groupId);

        return res.status(201).json(newGroup);
    }catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const getGroupOverview = async (req, res) => {
    const { groupId } = req.params;
    try {
        const data = await getOverviewByGroupId(groupId);

        // no spot found
        if (data.length === 0){
            return res.status(404).json({ message: "Cannot found overviews by given groupId."});
        }
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const getInvitation = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await getInvitationByUserId(userId);

        // no spot found
        if (data.length === 0){
            return res.status(404).json({ message: "Cannot found invitations by given userId."});
        }
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const putInvitation = async (req, res) => {
    const { invitationId } = req.params;
    const { status } = req.body;

    try {
        const updateInvitation = await updateInvitation(invitationId, status);

        return res.status(201).json(updateInvitation);
    }catch (error) {
        return res.status(500).json({ message: error.message});
    }
}



//GET get group: how to know who is the group owner
//POST create group: when to add group country
//POST create invitation: do we need to add group_id in the invitation
//POST create invitation: the status char
