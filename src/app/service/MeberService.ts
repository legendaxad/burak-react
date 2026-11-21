import { serverApi } from "../../lib/config";
import axios from "axios";
import { LoginInput, Member, MemberInput } from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      let url = this.path + "/member/top-users";
      const result = await axios.get(url);
      return result.data;
    } catch (err) {
      console.error("Error, getTopUsers:", err);
      throw err;
    }
  }
  public async getRestaurant(): Promise<Member> {
    try {
      let url = this.path + "/member/restaurant";
      const result = await axios.get(url);
      const restaurant: Member = result.data;
      return restaurant;
    } catch (err) {
      console.error("Error, getRestaurant:", err);
      throw err;
    }
  }
  public async signup(input: MemberInput): Promise<Member> {
    try {
      let url = this.path + "/member/signup";
      const result = await axios.post(url, input, { withCredentials: true });
      const member: Member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.error("Error, signup:", err);
      throw err;
    }
  }
  public async login(input: LoginInput): Promise<Member> {
    try {
      let url = this.path + "/member/login";
      const result = await axios.post(url, input, { withCredentials: true });
      const member: Member = result.data.member;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.error("Error, login:", err);
      throw err;
    }
  }
  public async logout(): Promise<void> {
    try {
      let url = this.path + "/member/logout";
      const result = await axios.post(url, {}, { withCredentials: true });
      localStorage.removeItem("memberData");
      return result.data.logout;
    } catch (err) {
      console.error("Error, logout:", err);
      throw err;
    }
  }
}

export default MemberService;
