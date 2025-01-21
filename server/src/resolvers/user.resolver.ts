import { User } from "../models/user.model";
import { authentication, generateToken, random } from "../lib";

export const userResolver = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const userId = context?.req?.user?.id;
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        throw new Error("Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error in user queries:", err);
        throw new Error(err.message || "Error getting user");
      }
    },
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.error("Error in user queries:", err);
        throw new Error(err.message || "Error getting user");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }) => {
      try {
        const { fullName, email, password } = input;
        if (!fullName || !email || !password) {
          throw new Error("All fields are required");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }
        const salt = random();
        const hashedPassword = authentication(salt, password);

        const newUser = new User({
          fullName,
          email,
          role: "user",
          authentication: {
            salt,
            password: hashedPassword,
          },
        });

        await newUser.save();
        return newUser;
      } catch (error) {
        console.error("Error in signUp: ", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { email, password } = input;
        if (!email || !password) throw new Error("All fields are required");
        const user = await User.findOne({ email }).select(
          "+authentication.salt +authentication.password",
        );

        if (!user) {
          throw new Error("Wrong login or password");
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
          throw new Error("Wrong login or password");
        }
        const token = generateToken(user._id.toString(), user.email);

        context.res.cookie("session_token", token, {
          domain: "localhost",
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "none",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
        return context.res.status(200).json(user).end();
        // return user;
      } catch (err) {
        console.error("Error in login:", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    logout: async (_, __, context) => {
      try {
        context.res.clearCookie("session_token");
        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Error in logout:", error);
        throw new Error(
          error instanceof Error ? error.message : "Internal server error",
        );
      }
    },
  },
};
