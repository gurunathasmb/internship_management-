import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded user data (id, role) to the request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const verifyCompany = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'company') {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied. Only companies can perform this action.' });
    }
  });
};

export const verifyStudent = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'student') {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied. Only students can perform this action.' });
    }
  });
};
