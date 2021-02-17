const displayContent = (req, res) => {
  const url = req.url;
  const method = req.method;

  if(url == "/profile"){
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Node Profile</h1>');
    return res.end();
  }

  else if (url == "/"){
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Node Microblog</h1>');
    return res.end();
  }

  else if (url == "/settings" && method == "POST"){
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Form was submitted</h1>');
    return res.end();
  }

  else if (url == "/settings"){
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Settings</h1><form action="/settings" method="POST"><input type="text"><button type="submit">Press me</button></form>');
    return res.end();
  }

  res.setHeader('Content-Type', 'text/html');
  res.write('<h1>Page Not Found</h1>');
}

module.exports = displayContent;