<?php

namespace App\Http\Controllers;

use App\Models\SessionChat;
use Illuminate\Http\Request;
use App\Services\ChatService;

class ChatController extends Controller
{
    protected $chatService;

    public function __construct(ChatService $chatService)
    {
        $this->chatService = $chatService;
    }

    public function getChats(Request $request) {

        $sessionId = $request->session_id;

        if (!$sessionId) {
            return response()->json(['error' => 'Session ID is required'], 400);
        }

        $session = SessionChat::whereSessionId($sessionId)->first();
        $chats = $this->chatService->getChatsBySessionId($session->id)->map(function ($item) {
            return [
                "role" => $item->role,
                "content" => $item->message,
            ];
        });
        if ($chats->isEmpty()) {
            $chats->push([
                "role" => "assistant",
                "content" => "Hi, I'm ChatGPT. Please feel free to ask me anything or let me know how I can assist you today!",
            ]);
        }
        return response()->json($chats);
    }


    public function getSession()
    {
        $list = $this->chatService->getLatestSession();
        return response()->json(['list' => $list]);
    }



    public function getSessionId()
    {
        $session = $this->chatService->createSession();
        return response()->json(['session_id' => $session->session_id]);
    }

    public function chatWithOpenAI(Request $request)
    {
        $request->validate([
            'session_id' => 'required|string',
            'message' => 'required|string'
        ]);

        $session = $this->chatService->getSessionById($request->input('session_id'));
        if (!$session) {
            return response()->json(['error' => 'Session not found'], 404);
        }

        $userMessage = $request->input('message');
        $conversationHistory = $this->chatService->getConversationHistory($session->id, $userMessage);
        $botReply = $this->chatService->callOpenAI($conversationHistory);

        $this->chatService->storeChatMessage($session->id, 'user', $userMessage);
        $this->chatService->storeChatMessage($session->id, 'assistant', $botReply);

        return response()->json([
            'user_message' => $userMessage,
            'bot_reply' => $botReply
        ]);
    }
}
