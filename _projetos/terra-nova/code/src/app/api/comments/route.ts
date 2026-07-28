import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the shape of a comment
interface Comment {
  id: string;
  dishId: number;
  username: string;
  text: string;
  date: string;
}

// Ensure the _data directory exists
const dataDir = path.join(process.cwd(), '_data');
const commentsFile = path.join(dataDir, 'comments.json');

// Initialize the data file if it doesn't exist
async function initFile() {
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }

  try {
    await fs.access(commentsFile);
  } catch {
    await fs.writeFile(commentsFile, JSON.stringify([], null, 2), 'utf-8');
  }
}

export async function GET() {
  await initFile();
  try {
    const data = await fs.readFile(commentsFile, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading comments:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  await initFile();
  try {
    const newComment: Comment = await request.json();
    const data = await fs.readFile(commentsFile, 'utf-8');
    const comments: Comment[] = JSON.parse(data);
    
    comments.push(newComment);
    
    await fs.writeFile(commentsFile, JSON.stringify(comments, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true, comment: newComment });
  } catch (error) {
    console.error('Error writing comment:', error);
    return NextResponse.json({ success: false, error: 'Failed to save comment' }, { status: 500 });
  }
}
