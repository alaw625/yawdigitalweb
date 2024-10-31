const fs = require("fs");

module.exports = async function (eleventyConfig) {
  // const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  // eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  //enable shortcode to simplfy adding svg to the templates e.g. {% svg "myfile" %}
  let getSvgContent = function (file) {
    let relativeFilePath = `./src/svg/${file}.svg`;
    let data = fs.readFileSync(relativeFilePath, function (err, contents) {
      if (err) return err;
      return contents;
    });
    return data.toString("utf8");
  };
  eleventyConfig.addShortcode("svg", getSvgContent);  

  /* Pass Through File Copy */
  eleventyConfig.addPassthroughCopy("src/_includes/assets/images");  
  eleventyConfig.addPassthroughCopy("src/_includes/assets/js");
  eleventyConfig.addPassthroughCopy("src/style.css");

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
  };
};
