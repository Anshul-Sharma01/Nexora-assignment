import { AuthService } from "../services/auth.service.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const token = await this.authService.signup(name, email, password);
      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await this.authService.login(email, password);
      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
}
