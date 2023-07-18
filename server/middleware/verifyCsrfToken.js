import jwt from "jsonwebtoken";

export const verifyCsrfToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const csrfToken = req.cookies.csrfToken;

  if (!accessToken || !csrfToken) {
    res.clearCookie("accessToken", {
      secure: true,
      sameSite: "none"
    });
    
    res.clearCookie("csrfToken", {
      secure: true,
      sameSite: "none"
    });

    return res.status(401).json("Nieautoryzowany dostęp.");
  }

  try {
    const decodedToken = jwt.verify(accessToken, "secretkey");
    const decodedCsrfToken = jwt.verify(csrfToken, "csrfSecret");

    if (decodedToken.id !== decodedCsrfToken.id) {

      res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
      });
      
      res.clearCookie("csrfToken", {
        secure: true,
        sameSite: "none"
      });

      return res.status(401).json("Nieautoryzowany dostęp.");
    }

    next();
  } catch (error) {
    res.status(403).json("Nieprawidłowe dane uwierzytelniające.");
  }
};

export const getTokens = (req, res) => {
  const accessToken = req.cookies.accessToken;
  const csrfToken = req.cookies.csrfToken;

  if (!accessToken || !csrfToken){
    return res.send(false);
  }

  return res.send(true)
};