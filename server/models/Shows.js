import mongoose, { Schema } from "mongoose";

const ShowsSchema = new Schema(
  {
    movie: { type: String, required: true, ref: "Movie" },
    showDateTime: { type: Date, requried: true },
    showPrice: { type: Number, required: true },
    occupiedSeats: { type: Object, default: {} },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

export const Shows = mongoose.model("Shows", ShowsSchema);
