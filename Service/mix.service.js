const { getProfile } = require("@Service/profile.service");
const { findSingleFriend } = require("@Service/interactions.service");

const checkProfileEligibility = async (profileId, friendProfileId) => {
  const { isPrivate } = await getProfile(
    { profileId: friendProfileId },
    { attributes: ["isPrivate"] }
  );

  if (isPrivate) {
    const friends = await findSingleFriend(profileId, friendProfileId);
    if (!friends) return false;
  }
  return true;
};

module.exports = { checkProfileEligibility };
