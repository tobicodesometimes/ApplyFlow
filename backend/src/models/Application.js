import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    category: {
      type: String,
      enum: ["dream", "referral", "cold"],
      default: "cold",
    },

    company: { type: String, required: true },
    role: { type: String, required: true },
    jobLink: { type: String },

    status: {
      type: String,
      enum: ["saved", "applied", "phone", "oa", "onsite", "offer", "rejected"],
      default: "applied",
    },

    appliedDate: { type: Date, default: Date.now },

    nextAction: { type: String }, // e.g. “Follow up email”
    nextActionDate: { type: Date }, // when you plan to do it

    location: { type: String },
    salaryRange: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
