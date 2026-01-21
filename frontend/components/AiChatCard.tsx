'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { Send, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AiChatCard = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modelUsed, setModelUsed] = useState('');

  const handleAsk = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setResponse('');
    setModelUsed('');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/v1/chat/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (data.error) {
        setResponse('Sorry, something went wrong.');
      } else {
        setResponse(data.response);
        setModelUsed(data.model_used);
      }
    } catch (error) {
      setResponse('Failed to connect to the AI.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-background border-primary/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-red" />
          Demon Helper
        </CardTitle>
        <div className="w-full bg-border h-px -mt-1" />
        <CardDescription className="text-center">
          Ask about the Top 150, point values, or records!
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="min-h-37.5 max-h-75 bg-muted/50 rounded-md p-4 overflow-y-auto whitespace-pre-wrap text-sm border">
          {isLoading ?
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <Bot className="w-4 h-4" />
              Thinking...
            </div>
          : response ?
            <div>
              <div className="leading-relaxed">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
              {modelUsed && (
                <p className="text-[10px] text-muted-foreground mt-2 text-right italic">
                  Answered by: {modelUsed}
                </p>
              )}
            </div>
          : <p className="text-muted-foreground text-center italic mt-10">
              "Who verified Acheron?"
              <br />
              "Points for Tidal Wave?"
            </p>
          }
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Ask a question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            disabled={isLoading}
          />
          <Button onClick={handleAsk} disabled={isLoading} size="icon" variant="outline">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiChatCard;
