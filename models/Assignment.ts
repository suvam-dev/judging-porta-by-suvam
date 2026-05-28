import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const AssignmentSchema = new Schema(
  {
    roundId: { type: Schema.Types.ObjectId, ref: "Round", required: true, index: true },
    judgeId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true, index: true },
  },
  { timestamps: true },
);

AssignmentSchema.index({ roundId: 1, judgeId: 1, teamId: 1 }, { unique: true });

export type AssignmentDoc = InferSchemaType<typeof AssignmentSchema> & { _id: mongoose.Types.ObjectId };

export const Assignment: Model<AssignmentDoc> =
  (mongoose.models.Assignment as Model<AssignmentDoc>) ||
  mongoose.model<AssignmentDoc>("Assignment", AssignmentSchema);
