// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "@/pages/models/User";
import mongooseConnect from "@/pages/lib/mongoose";

export default async function addFavorite(req, res) {
  await mongooseConnect();
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { id } = req.body;
  const { user } = req.body;
  const { remove } = req.body;

  try {
    let existingUser = await User.findById(user);
    console.log(existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!existingUser.favorites) {
      console.log("favorites Created");
      existingUser.favorites = []; // Create the favorites field if it doesn't exist
    }
    if (!remove) {
      existingUser.favorites.push(id);
    } else {
      existingUser.favorites = existingUser.favorites.filter(
        (fav) => fav !== id
      );
    }
    console.log(existingUser.favorites);
    await User.findByIdAndUpdate(user, { favorites: existingUser.favorites });

    return res.status(200).json({ favorites: existingUser.favorites });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
