const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const analyzePlagiarism = async (text) => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Groq API key chưa được cấu hình.");
  }

  const systemPrompt = `Bạn là một chuyên gia phân tích liêm chính học thuật. Nhiệm vụ của bạn là phân tích đoạn văn bản được gửi đến và đánh giá:

1. **Khả năng đạo văn**: Đánh giá xem văn bản có dấu hiệu copy/paste từ nguồn khác không (dựa trên phong cách viết không nhất quán, thuật ngữ chuyên ngành bất thường, sự thay đổi giọng văn).

2. **Khả năng viết bởi AI**: Đánh giá xem văn bản có dấu hiệu được tạo bởi AI không (dựa trên cấu trúc quá hoàn hảo, thiếu cá tính viết, sử dụng pattern lặp lại).

3. **Chất lượng trích dẫn**: Kiểm tra xem văn bản có trích dẫn nguồn đúng cách không.

Trả về kết quả dưới dạng JSON với cấu trúc CHÍNH XÁC sau (không thêm markdown, không thêm backtick):
{
  "plagiarismScore": <số từ 0-100>,
  "aiScore": <số từ 0-100>,
  "citationScore": <số từ 0-100>,
  "overallRisk": "<low|medium|high>",
  "summary": "<tóm tắt ngắn bằng tiếng Việt>",
  "details": [
    {
      "type": "<plagiarism|ai|citation>",
      "severity": "<low|medium|high>",
      "message": "<mô tả chi tiết bằng tiếng Việt>"
    }
  ],
  "suggestions": ["<gợi ý 1>", "<gợi ý 2>", "<gợi ý 3>"]
}

Lưu ý:
- plagiarismScore: 0 = không có dấu hiệu đạo văn, 100 = chắc chắn đạo văn
- aiScore: 0 = chắc chắn do người viết, 100 = chắc chắn do AI viết
- citationScore: 0 = không có trích dẫn nào, 100 = trích dẫn hoàn hảo
- Luôn phản hồi bằng tiếng Việt
- CHỈ trả về JSON, KHÔNG kèm theo bất kỳ text nào khác`;

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Phân tích đoạn văn bản sau:\n\n"""${text}"""`,
        },
      ],
      temperature: 0.3,
      max_tokens: 2048,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || `Groq API lỗi: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Không nhận được phản hồi từ AI.");
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Không thể phân tích kết quả từ AI.");
  }
};
