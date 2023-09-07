import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthUser } from './authUser.schema';
import { JwtService } from '@nestjs/jwt/dist';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { ProfileDto } from './dto/profile.dto';
import { UpdatedUserDto } from './dto/updatedUser.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { MailService } from './mail.service';
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthUser.name)
    private authUserModel: Model<AuthUser>,
    private jwtService: JwtService,
    private mailerService: MailService,
  ) {}

  //Service for Signup or creating new user
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { firstName, lastName, email, password, phoneNo } = signUpDto;
    const encrypedPassword = await cryptr.encrypt(password);
    const users = await this.authUserModel.findOne({ email });
    if (users) {
      throw new UnauthorizedException('User already Exists');
    }
    const user = await this.authUserModel.create({
      firstName,
      lastName,
      email,
      password: encrypedPassword,
      phoneNo,
    });
    const token = this.jwtService.sign({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    return { token };
  }

  //Login service
  async login(loginDto: LoginDto): Promise<{
    token: string;
    userId: string;
    firstName: string;
    lastName: string;
    isAdmin: Boolean;
  }> {
    const { email, password } = loginDto;

    const user = await this.authUserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const decryptedPassword = await cryptr.decrypt(user.password);
    const isPasswordMatched = password === decryptedPassword;

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const userId = user.id;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const isAdmin = user.isAdmin;

    const token = this.jwtService.sign({
      id: user.id,
      firstName: user.firstName,
    });
    return { token, userId, firstName, lastName, isAdmin };
  }

  //for check password
  async checkPassword(changePasswordDto: ProfileDto, id: string) {
    const { password } = changePasswordDto;
    const user = await this.findUser(id);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    const decryptedPassword = await cryptr.decrypt(user.password);
    const isPasswordMatched = password === decryptedPassword;
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Wrong password');
    }
    return;
  }

  //Forgot password
  async forgetPassword(forgetpasswordDto: ForgetPasswordDto) {
    const { email } = forgetpasswordDto;
    const user = await this.authUserModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User does not exists');
    }
    const emailConfig = {
      to: `${user.email}`,
      subject: 'Cornelis - Change Password',
      html: `<p>Hey ${user.firstName} ${user.lastName},</p>
       <p> This email is for <b>change <b>password .</p>
      <p>Please complete your change password process by clicking 
      <a style href="http:localhost:3000?userName=${user.firstName}&userEmail=${user.email}&roleId=${user._id}"
      >here</a>.</p>
      <p style="color:#4F709C">http://localhost:3000?userName=${user.firstName}&userEmail=${user.email}&roleId=${user._id}</p>
      <p style="color:#A12568"> checkout our website <a href="https://learning-courses.surge.sh/">here.</a></p>
      <p>Thanks,</p>
      <p style="color:#B31312">Team Cornelis </p>`,
    };
    await this.mailerService.sendEmail(emailConfig);
    return;
  }

  //For Getting all user
  async fetchUser() {
    const users = await this.authUserModel.find().exec();
    return users;
  }

  //For Getting single user
  async fetchSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return user;
  }

  //For deleting user
  async deleteUser(userId: string) {
    const result = await this.authUserModel.deleteOne({ _id: userId }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find User');
    }
  }

  //For updating user
  async updateUser(userId, updatedUserDto: UpdatedUserDto) {
    const { firstName, lastName, email, phoneNo } = updatedUserDto;

    const updateUser = await this.findUser(userId);
    if (firstName) {
      updateUser.firstName = firstName;
    }
    if (lastName) {
      updateUser.lastName = lastName;
    }

    if (email) {
      updateUser.email = email;
    }

    if (phoneNo) {
      updateUser.phoneNo = phoneNo;
    }

    // if (password) {
    //   console.log(password, 'actual password');
    //   const encrypedPassword = await cryptr.encrypt(password);
    //   console.log(encrypedPassword, 'Encryped password');
    //   const matchedPassword = await cryptr.decrypt(encrypedPassword);
    //   console.log(matchedPassword, 'decrpted password');
    //   updateUser.password = encrypedPassword;
    // }
    updateUser.save();
    const users = await this.authUserModel.find().exec();
    return { updateUser, users };
  }

  // For Finding user
  private async findUser(id: string): Promise<AuthUser> {
    let user;
    try {
      user = await this.authUserModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find User');
    }

    if (!user) {
      throw new NotFoundException('Could not find User');
    }
    return user;
  }
}
