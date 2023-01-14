export const config = {
    methodNames: Object.keys(console),
};
export const defineConfig = (cfg) => {
    Object.assign(config, cfg);
};
