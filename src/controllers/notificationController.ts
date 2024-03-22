import type { Request, Response } from "express";
import supabase from "../supabase/db";

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { userId, drepId } = req.query;
    if (!userId && !drepId) {
      throw {
        status: 400,
        message: "Either user_id or drep_id must be provided",
      };
    }
    let notifications = [];
    if (userId) {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user", userId);
      if (!data || error)
        throw {
          status: 400,
          message: `Could not fetch user notifications`,
        };
      notifications = data;
    } else {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("drep", drepId);
      if (!data || error)
        throw {
          status: 400,
          message: `Could not fetch drep notifications`,
        };
      notifications = data;
    }
    res.status(200).json({ notifications });
  } catch (err: any) {
    res.status(err.status).json({ message: err.message });
  }
};

export const markNotificationAsOpened = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.notificationId as string;
    const { error } = await supabase
      .from("notifications")
      .update({ opened: true })
      .eq("id", notificationId);

    if (error) {
      throw {
        status: 500,
        message: "Failed to mark notification as opened",
      };
    }
    res.status(200).json({
      message: `Notification marked as opened successfully for ID: ${notificationId}`,
    });
  } catch (err: any) {
    res.status(err.status).json({ message: err.message });
  }
};
