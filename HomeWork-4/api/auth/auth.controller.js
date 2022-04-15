import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../users/users.model";
import { createControllerProxy } from "../helpers/controllerProxy";
import { Conflict, Unauthorized } from "../helpers/errorConstaructor";

export class AuthController {
  async signUp(req, res, next) {
    try {
      // 1. validate body
      // 2. get  existing user with such email
      // 3. if user exist - throw 409 conflict
      // 4. create password hash
      // 5. save user to DB
      // 6. send successful response - 201

      const { userName, email, password } = req.body;

      const existingUser = await UserModel.findByEmail(email);

      if (existingUser) {
        throw new Conflict("User with such email already exists");
      }

      const passwordHash = await this.createHash(password);

      const newUser = await UserModel.createUser(userName, email, passwordHash);

      return res.status(201).json({
        id: newUser._id,
      });
    } catch (error) {
      next(error);
    }
  }

  validateSignUp(req, res, next) {
    const newUserSchemaParams = Joi.object({
      userName: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["ua"] },
        })
        .required(),
      password: Joi.string().required(),
    });

    const validationResult = newUserSchemaParams.validate(req.body);

    if (validationResult.error) {
      return res.status(404).json(validationResult.error);
    }

    next();
  }

  async createHash(password) {
    const BCRYPTJS_SALT_ROUNDS = +process.env.BCRYPTJS_SALT_ROUNDS;

    return bcrypt.hash(password, BCRYPTJS_SALT_ROUNDS);
  }

  async signIn(req, res, next) {
    // 1. validate res body
    // 2. find user by email
    // 3. if not user - throw 401 error
    // 4. compare password with DB passwordHash
    // 5. if comparison fail - throw 401 error
    // 6. generate auth token
    // 7. save token to user
    // 8. save to cookies
    // 9. send res successful 200
    try {
      const { email, password } = req.body;

      const user = await UserModel.findByEmail(email);
      if (!user) {
        throw new Unauthorized("Email is incorrect");
      }

      const isPasswordValid = await this.comparePasswords(
        password,
        user.passwordHash
      );

      if (!isPasswordValid) {
        throw new Unauthorized("Password is incorrect");
      }

      const authToken = this.createToken(user);

      await UserModel.updateUser(user._id, { token: authToken });

      res.cookie("token", authToken, { httpOnly: true });

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  validateSignIn(req, res, next) {
    const validateSignInSchema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["ua"] },
        })
        .required(),
      password: Joi.string().required(),
    });

    const validationResult = validateSignInSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(404).json(validationResult.error);
    }

    next();
  }

  async comparePasswords(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }

  createToken(user) {
    const payload = { uid: user._id };
    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }
}

export const authController = createControllerProxy(new AuthController());
