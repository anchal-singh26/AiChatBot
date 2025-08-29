import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const protect = async (req, res, next) => {
  let token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" })
    }

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" })
  }
}
