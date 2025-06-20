import { Inngest } from "inngest";
import { User } from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-booking-app" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      name: first_name + " " + last_name,
      _id: id,
      email: email_addresses[0].email_address,
      image: image_url,
    };

    await User.create(userData);
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    const { id } = event.data;
    const _id = id;
    await User.findByIdAndDelete(_id);
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data

    const userData = {
      name: first_name + " " + last_name,
      _id: id,
      email: email_addresses[0].email_address,
      image: image_url,
    };
    const _id = id
    await User.findByIdAndUpdate(_id,userData)

  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserDeletion.syncUserUpdation];
