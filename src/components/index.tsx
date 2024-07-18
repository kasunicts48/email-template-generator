import React, { useState, useRef  } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toJpeg, toPng } from 'html-to-image';

const inputStyle : React.CSSProperties   = {
  display: "block",
  margin: "10px 0px",
  padding: "8px",
  width: "100%",
  maxWidth: "400px",
  boxSizing: "border-box",
};

const labelStyle : React.CSSProperties = {
  fontWeight: "bold",
  marginBottom: "5px",
  display: "block",
};

const EmailGenarator = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef(null);

  const signatureHtml = `
  <div>
    <p><strong>${name}</strong></p>
    <p>${title}</p>
    <p>Email: <a href="mailto:${email}">${email}</a></p>
    <p>Phone: ${phone}</p>
    <p>Company: ${company}</p>
    <p>Website: <a href="${website}" target="_blank" rel="noopener noreferrer">${website}</a></p>
  </div>
`;

  const handleExportAsImage = () => {
    if (previewRef.current) {
      toJpeg(previewRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'email-signature.jpeg';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Error exporting image:', err);
        });
    }
  };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Email Signature Generator</h1>
      <form
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          <div>
            <label style={labelStyle}>Name: </label>
            <input
              style={inputStyle}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>Title: </label>
            <input
              style={inputStyle}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <label style={labelStyle}>Email: </label>
            <input
              style={inputStyle}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>Website: </label>
            <input
              style={inputStyle}
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div>
            <label style={labelStyle}>Phone: </label>
            <input
              style={inputStyle}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label style={labelStyle}>Company: </label>
            <input
              style={inputStyle}
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
      </form>

      <h2>Preview:</h2>
      <div ref={previewRef} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px', background: "#fff" }}>
        <p><strong>{name}</strong></p>
        <p>{title}</p>
        <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
        <p>Phone: {phone}</p>
        <p>Company: {company}</p>
        <p>Website: <a href={website} target="_blank" rel="noopener noreferrer">{website}</a></p>
      </div>

      <CopyToClipboard text={signatureHtml} onCopy={() => setCopied(true)}>
        <button style={{ marginTop: '20px', padding: '10px 20px' }}>Copy to Clipboard</button>
      </CopyToClipboard>
      {copied && <p style={{ color: 'green' }}>Signature copied to clipboard!</p>}

      <button onClick={handleExportAsImage} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Export as Image
      </button>
    </div>
  );
};

export default EmailGenarator;