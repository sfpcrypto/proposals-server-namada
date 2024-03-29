import moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@root": `${__dirname}/`,
  "@utils": `${__dirname}/utils/`,
  "@api": `${__dirname}/api/`,
  "@types": `${__dirname}/types/`,
});
