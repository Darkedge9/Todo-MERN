import User from "../model/user.model.js";
import { toLowerCase, z } from "zod";
import bcrypt from "bcryptjs";
import { generateTokenAndSaveInCookies } from "../jwt/token.js";

const userSchema = z.object({
  email: z.string().email({ message: "Invalid Email Adrress" }),
  username: z.string().min(3, { messsage: "Username atleast 3 character" }),
  password: z
    .string()
    .min(6, { messsage: "Password atleast 6 character" })
    .max(20),
});

export const register = async (req, res) => {
  // console.log("Signup Function Called");

  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(500).json({ errors: " All fields are required" });
    }

    const validation = userSchema.safeParse({ email, username, password });
    if (!validation.success) {
      // return res.status(400).json({errors : validation.error.issues}) ;
      const errorMessage = validation.error.issues.map((err) => err.message);
      return res.status(400).json({ errors: errorMessage });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: "User already registerd" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashPassword });
    await newUser.save();
    if (newUser) {

       const token = await generateTokenAndSaveInCookies(newUser._id, res)
      res.status(201).json({ message: "User registerd Successfully", newUser , token});
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: " Error in registering user" });
  }
};

export const login = async (req, res) => {
  //   console.log("Login Function Called");

  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fiels are necessary" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ errors: "Invalid Email or Password" });
    }

 
    const token = await generateTokenAndSaveInCookies(user._id, res)
    res.status(200).json({ message: "user logged in Successfully", user , token});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: " Error in logging user" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      path: "/",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out user" });
  }
};

