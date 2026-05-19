import { Request, Response } from "express";
import Lead from "../models/Lead";

export const createLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.create(req.body);

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;

    const limit = 10;

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const status = req.query.status || "";

    const source = req.query.source || "";

    const query: any = {};

    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    const leads = await Lead.find(query)
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const updateLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Lead.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Lead deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};