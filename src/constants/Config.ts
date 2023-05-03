interface Config {
    port: number;
    RKSIUrl: string;
}

const config: Config = {
    port: 3000,
    RKSIUrl: "https://rksi.ru/mobile_schedule",
};

export default config;