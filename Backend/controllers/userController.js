import { getUserStats } from "../models/user/userStatsModel.js";
import { getUserProfile } from "../models/user/User.js";
import { updateUser } from "../models/user/User.js";

export const getStats = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const stats = await getUserStats(userId);

    res.json({
      success: true,
      data: stats,
    });

  } catch (error) {
    console.error("GET STATS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const profile = await getUserProfile(userId);

    res.json({
      success: true,
      data: profile,
    });

  } catch (error) {
    console.error("Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, bio } = req.body;

    let avatar_url;

    if (req.file) {
      avatar_url = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    await updateUser(userId, {
      name,
      bio,
      avatar_url,
    });

    res.json({
      success: true,
      message: "Profile updated",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
};