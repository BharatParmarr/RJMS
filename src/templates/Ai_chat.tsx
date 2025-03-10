import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Send, Settings, History, AutoAwesome } from '@mui/icons-material';
import { IconButton, CircularProgress } from '@mui/material';
import { apis2 } from '../apis';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #0f172a;
  color: #e2e8f0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    color: #3b82f6;
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 1.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.5);
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const MessageWrapper = styled.div<{ isAi: boolean }>`
  display: flex;
  justify-content: ${props => props.isAi ? 'flex-start' : 'flex-end'};
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

// const Message = styled.div<{ isAi: boolean }>`
//   max-width: 80%;
//   padding: 1rem;
//   border-radius: 0.5rem;
//   background-color: ${props => props.isAi ? 'rgba(30, 41, 59, 0.8)' : 'rgba(59, 130, 246, 0.1)'};
//   border: 1px solid ${props => props.isAi ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'};
//   box-shadow: ${props => props.isAi ? '0 0 15px rgba(59, 130, 246, 0.1)' : 'none'};

//   @media (max-width: 768px) {
//     max-width: 90%;
//   }
// `;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  padding-right: 3rem;
  background-color: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.8);
  border-radius: 0.5rem;
  color: #e2e8f0;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  
  &::placeholder {
    color: #64748b;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const SendBtn = styled(IconButton)`
  position: absolute !important;
  right: 0.5rem;
  background-color: #3b82f6 !important;
  
  &:hover {
    background-color: #2563eb !important;
  }
  
  svg {
    color: white;
  }

  @media (max-width: 768px) {
    right: 0.25rem;
  }
`;

const Sidebar = styled.div`
display: none;
  width: 320px;
  border-left: 1px solid #1e293b;
  padding: 1.5rem;
  background-color: rgba(15, 23, 42, 0.5);

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid #1e293b;
    padding: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 100%;
    z-index: 1000;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  svg {
    color: #3b82f6;
    margin-right: 0.5rem;
  }
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const HistoryItem = styled.div<{ active: boolean }>`
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${props => props.active ? 'rgba(59, 130, 246, 0.3)' : 'transparent'};
  background-color: ${props => props.active ? 'rgba(59, 130, 246, 0.2)' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.active ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 41, 59, 0.8)'};
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    margin-bottom: 0.25rem;
  }
`;
const ResponseContainer = styled.div`
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #e2e8f0;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Paragraph = styled.p`
  margin: 0.75rem 0;
  font-size: 1rem;
`;

const BulletPoint = styled.li`
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #3b82f6;
    font-weight: bold;
  }
`;

const SubBulletPoint = styled(BulletPoint)`
  margin-left: 1.5rem;
  font-size: 0.95rem;
  
  &::before {
    content: '◦';
    color: #60a5fa;
  }
`;

const Bold = styled.span`
  color: #93c5fd;
  font-weight: 600;
`;

// const Highlight = styled.span`
//   background: linear-gradient(120deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.2));
//   padding: 0.2rem 0.4rem;
//   border-radius: 4px;
//   border: 1px solid rgba(59, 130, 246, 0.2);
// `;
const UserMessage = styled.div`
  background: rgba(59, 130, 246, 0.1);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #e2e8f0;
`;



const formatResponse = (text: string) => {
  // Split the response into lines
  const lines = text.split('\n');

  return lines.map((line, index) => {
    // Main bullet points (start with *)
    if (line.trim().startsWith('*')) {
      const content = line.replace('*', '').trim();
      return <BulletPoint key={index}>{formatText(content)}</BulletPoint>;
    }
    // Sub bullet points (start with ***)
    else if (line.trim().startsWith('***')) {
      const content = line.replace('***', '').trim();
      return <SubBulletPoint key={index}>{formatText(content)}</SubBulletPoint>;
    }
    // Regular paragraphs
    else if (line.trim()) {
      return <Paragraph key={index}>{formatText(line)}</Paragraph>;
    }
    return null;
  });
};

// Helper function to format text styling
const formatText = (text: string) => {
  // Handle bold text between **
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part: string, index: number) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Remove the ** markers and wrap in Bold component
      const content = part.slice(2, -2);
      return <Bold key={index}>{content}</Bold>;
    }
    return part;
  });
};

const AIResponse = ({ response }: { response: string }) => {
  return (
    <ResponseContainer>
      {formatResponse(response)}
    </ResponseContainer>
  );
};

const NoMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  background-color: rgba(30, 41, 59, 0.5);
  border-radius: 12px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NoMessageTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #3b82f6;
  margin-bottom: 1rem;
`;

const NoMessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NoMessageItem = styled.li`
  font-size: 1rem;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
`;



function AiHighlights() {
  return (
    <NoMessageContainer>
      <NoMessageTitle>Discover BizMind</NoMessageTitle>
      <NoMessageList>
        <NoMessageItem>Ask about business strategies</NoMessageItem>
        <NoMessageItem>Get insights on market trends</NoMessageItem>
        <NoMessageItem>Receive personalized advice</NoMessageItem>
      </NoMessageList>
    </NoMessageContainer>
  );
}

function AiChat() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  type Message = {
    text: string;
    isAi: boolean;
  }
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<Message[]>([]);

  useEffect(() => {
    apis2.get('/chat/').then((res) => {
      let temp_history = []
      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data)
        temp_history.push({ text: res.data[i].question, isAi: false })
        temp_history.push({ text: res.data[i].answer, isAi: true })
      }
      setHistory(temp_history);
    });
  }, []);

  async function handleSend() {
    setLoading(true);
    if (input === '') {
      setLoading(false);
      return;
    }
    const res = await apis2.post('/chat/', {
      input: input,
      restorant_id: id
    });
    console.log(res.data.message)
    setMessages([...messages, { text: input, isAi: false }, { text: res.data.message, isAi: true }]);
    setInput('');
    setLoading(false);
  }
  return (
    <Container>
      <MainSection>
        <Header>
          <HeaderTitle>
            <AutoAwesome />
            <Title>BizMind</Title>
          </HeaderTitle>
          <IconButton sx={{ color: '#94a3b8' }}>
            <Settings />
          </IconButton>
        </Header>

        <ChatContainer>
          {history.map((message, index) => (
            <MessageWrapper key={index} isAi={message.isAi}>
              {message.isAi ? <AIResponse response={message.text} /> : <UserMessage>{message.text}</UserMessage>}
            </MessageWrapper>
          ))}
          {messages.map((message, index) => (
            <MessageWrapper key={index} isAi={message.isAi}>
              {message.isAi ? <AIResponse response={message.text} /> : <UserMessage>{message.text}</UserMessage>}
            </MessageWrapper>
          ))}
          {loading && <CircularProgress size={20} />}
          {messages.length === 1 && <AiHighlights />}
        </ChatContainer>
        <InputContainer>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
          />
          <SendBtn size="small" onClick={handleSend} disabled={loading}>
            {loading ? <CircularProgress size={20} /> : <Send />}
          </SendBtn>
        </InputContainer>
      </MainSection>

      <Sidebar>
        <SidebarHeader>
          <History />
          <h2>Chat History</h2>
        </SidebarHeader>
        <HistoryItem active={true}>Project Discussion</HistoryItem>
        <HistoryItem active={false}>Code Review</HistoryItem>
        <HistoryItem active={false}>Bug Analysis</HistoryItem>
      </Sidebar>
    </Container>
  );
}

export default AiChat;