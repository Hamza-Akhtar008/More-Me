import { errorResponse, successResponse } from "../../helpers";
import { QuestionCategory, Gamification, User } from "../../models";

export const createGamifications = async (req, res) => {
    const data = req.body;
  
    try {
      const gamificationData = await data.map((question) =>
        Gamification.create({
          type: question.type,
          text: question.text,
          options: question.options,
          companyId: question.companyId,
          image: question.image,
          questionCategoryId: question.questionCategoryId,
          correctOption: question.correctOption,
        })
      );
  
      return await Promise.all(gamificationData).then((data) =>
        successResponse(req, res, data)
      );
    } catch (error) {
      console.error("Error creating Gamifications:", error);
      throw error;
    }
};

export const getCompanyGamifications = async (req, res) => {
    try {
      const { companyId } = req.body;
      const gamifications = await Gamification.findAll({ where: { companyId } });
  
      const categories = await QuestionCategory.findAll({ where: { companyId } });
  
      return successResponse(req, res, { gamifications, categories });
    } catch (error) {
      throw error;
    }
};

export const updateUserGamification = async (req, res) => {
  try {
    // Find the user by their ID
    console.log(req.body);
    const { gamification, id, points } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    // Update the user's questionnaire
    if (gamification && points) {
      user.gamification = gamification;
      user.points = points;
    }

    // Save the changes to the database
    const resp = await user.save();
    return successResponse(req, res, resp);
  } catch (error) {
    return errorResponse(req, res, error);
    throw error;
  }
};