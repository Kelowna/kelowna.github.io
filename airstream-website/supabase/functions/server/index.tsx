import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-50e39d23/health", (c) => {
  return c.json({ status: "ok" });
});

// GitHub API Endpoints
app.post("/make-server-50e39d23/github/repos", async (c) => {
  try {
    const { username } = await c.req.json();
    const githubToken = Deno.env.get('GITHUB_TOKEN');
    
    if (!githubToken) {
      console.log('GitHub API error: GITHUB_TOKEN environment variable is not set');
      return c.json({ error: 'GitHub token not configured' }, 500);
    }

    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`GitHub API error fetching repos for ${username}: ${response.status} - ${errorText}`);
      return c.json({ error: `Failed to fetch repositories: ${response.statusText}` }, response.status);
    }

    const repos = await response.json();
    return c.json(repos);
  } catch (error) {
    console.log(`Error in /github/repos endpoint: ${error}`);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-50e39d23/github/repo-contents", async (c) => {
  try {
    const { owner, repo, path } = await c.req.json();
    const githubToken = Deno.env.get('GITHUB_TOKEN');
    
    if (!githubToken) {
      console.log('GitHub API error: GITHUB_TOKEN environment variable is not set');
      return c.json({ error: 'GitHub token not configured' }, 500);
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path || ''}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`GitHub API error fetching contents for ${owner}/${repo}/${path}: ${response.status} - ${errorText}`);
      return c.json({ error: `Failed to fetch contents: ${response.statusText}` }, response.status);
    }

    const contents = await response.json();
    return c.json(contents);
  } catch (error) {
    console.log(`Error in /github/repo-contents endpoint: ${error}`);
    return c.json({ error: error.message }, 500);
  }
});

app.post("/make-server-50e39d23/github/file-content", async (c) => {
  try {
    const { owner, repo, path } = await c.req.json();
    const githubToken = Deno.env.get('GITHUB_TOKEN');
    
    if (!githubToken) {
      console.log('GitHub API error: GITHUB_TOKEN environment variable is not set');
      return c.json({ error: 'GitHub token not configured' }, 500);
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`GitHub API error fetching file content for ${owner}/${repo}/${path}: ${response.status} - ${errorText}`);
      return c.json({ error: `Failed to fetch file: ${response.statusText}` }, response.status);
    }

    const file = await response.json();
    
    // Decode base64 content
    if (file.content) {
      const decoder = new TextDecoder();
      const content = atob(file.content.replace(/\n/g, ''));
      file.decodedContent = content;
    }
    
    return c.json(file);
  } catch (error) {
    console.log(`Error in /github/file-content endpoint: ${error}`);
    return c.json({ error: error.message }, 500);
  }
});

// OpenAI API Endpoints
app.post("/make-server-50e39d23/openai/generate", async (c) => {
  try {
    const { prompt } = await c.req.json();
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiKey) {
      console.log('OpenAI API error: OPENAI_API_KEY environment variable is not set');
      return c.json({ error: 'OpenAI API key not configured' }, 500);
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful coding assistant. Provide clear, well-commented code solutions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`OpenAI API error: ${response.status} - ${errorText}`);
      return c.json({ error: `Failed to generate code: ${response.statusText}` }, response.status);
    }

    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.log(`Error in /openai/generate endpoint: ${error}`);
    return c.json({ error: error.message }, 500);
  }
});

Deno.serve(app.fetch);