import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Param,
  Delete,
  Put,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { ProfileDto } from './dto/profile.dto';
import { UpdatedUserDto } from './dto/updatedUser.dto';
import { AuthGuard } from '@nestjs/passport';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';

@Controller('user')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(
    @Res() response,
    @Body() signUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    try {
      const userSignUp = await this.authService.signUp(signUpDto);
      return response.status(HttpStatus.OK).json({
        message: 'User Created Successfully',
        userSignUp,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Post('/login')
  async login(
    @Res() response,
    @Body() loginDto: LoginDto,
  ): Promise<{ token: string }> {
    try {
      const loginUser = await this.authService.login(loginDto);
      return response.status(HttpStatus.OK).json({
        message: 'logged in successfully',
        loginUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('/checkPassword/:id')
  async changePassword(
    @Res() response,
    @Body() changePasswordDto: ProfileDto,
    @Param('id') userId: string,
  ) {
    try {
      const checkPassword = await this.authService.checkPassword(
        changePasswordDto,
        userId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Password Found',
        checkPassword,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('/forgotPassword')
  async forgotPassword(
    @Res() response,
    @Body() forgotPasswordDto: ForgetPasswordDto,
  ) {
    try {
      await this.authService.forgetPassword(forgotPasswordDto);
      return response.status(HttpStatus.OK).json({
        message: 'Mail send sucessfully',
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAllUsers(@Res() response) {
    try {
      const userData = await this.authService.fetchUser();
      return response.status(HttpStatus.OK).json({
        message: 'All user data found successfully',
        userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get(':id')
  @UseGuards(AuthGuard())
  async getUser(@Res() response, @Param('id') userId: string) {
    try {
      const SingleUserData = await this.authService.fetchSingleUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'All User Found Successfully',
        SingleUserData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updatedUserDto: UpdatedUserDto,
    @Res() response,
  ) {
    try {
      const existingUser = await this.authService.updateUser(
        userId,
        updatedUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'User has been updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async removeUser(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.authService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
