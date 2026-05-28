import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const CriterionSchema = new Schema(
  {
    roundId: { type: Schema.Types.ObjectId, ref: "Round", required: true, index: true },

    name: { type: String, required: true, trim: true },
    description: { type: String, default: null, trim: true },

    // Weights are stored raw; the scoring layer normalizes them to sum to 1
    // across the round, so admins can edit one weight without rebalancing the rest.
    weight: { type: Number, required: true, min: 0 },
    max: { type: Number, required: true, min: 1 },

    order: { type: Number, required: true },
  },
  { timestamps: true },
);

CriterionSchema.index({ roundId: 1, order: 1 }, { unique: true });

export type CriterionDoc = InferSchemaType<typeof CriterionSchema> & { _id: mongoose.Types.ObjectId };

export const Criterion: Model<CriterionDoc> =
  (mongoose.models.Criterion as Model<CriterionDoc>) ||
  mongoose.model<CriterionDoc>("Criterion", CriterionSchema);
