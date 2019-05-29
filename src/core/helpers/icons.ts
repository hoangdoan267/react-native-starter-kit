const appIcons: { [name: string]: any } = {
    about: require(`../../assets/images/glyph-icons/PNG/about.png`),
    air_play: require(`../../assets/images/glyph-icons/PNG/air_play.png`),
    airdrop: require(`../../assets/images/glyph-icons/PNG/airdrop.png`),
};

export const icons = (iconName: string) => {
    return appIcons[iconName];
};
