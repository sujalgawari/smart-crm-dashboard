"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.updateLead = exports.getLeads = exports.createLead = void 0;
const Lead_1 = __importDefault(require("../models/Lead"));
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.create(req.body);
        res.status(201).json(lead);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.createLead = createLead;
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const search = req.query.search || "";
        const status = req.query.status || "";
        const source = req.query.source || "";
        const query = {};
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
        const leads = yield Lead_1.default.find(query)
            .skip(skip)
            .limit(limit)
            .sort({
            createdAt: -1,
        });
        const total = yield Lead_1.default.countDocuments(query);
        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            leads,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.getLeads = getLeads;
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lead = yield Lead_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(lead);
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.updateLead = updateLead;
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Lead_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Lead deleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.deleteLead = deleteLead;
