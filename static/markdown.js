import sanitizeHTML from 'sanitize-html';
import marked from 'marked';

const parseMarkdown = (text) => {
  const allowedTags = ["h1"];
  const parsed = marked(
    sanitizeHTML(text, {
      allowedTags
    })
    );
  return parsed;
}

export default parseMarkdown;