import React from "react";

const About = () => {
  return (
    <div className="text-white font-mono">
      <div className="text-xl text-center py-5">
        Chào mừng bạn đến với <span className="font-bold">23h59'</span>!
      </div>
      <tr className="">
        23h59' là blog dành cho những ai muốn chia sẻ tâm tư, suy nghĩ, những
        câu chuyện của riêng mình. Nơi đây là không gian mở để bạn có thể tự do
        thể hiện bản thân, kết nối với những người đồng điệu và cùng nhau khám
        phá những khía cạnh khác nhau của cuộc sống.
        <div className="py-4">
          Tại 23h59', bạn có thể:
          <td>
            <div className="font-bold py-2">Đăng tải những dòng tâm sự:</div>
            Chia sẻ những cảm xúc, suy nghĩ của bạn về bất kỳ chủ đề nào trong
            cuộc sống.
            <div className="font-bold py-2">Kể chuyện:</div>
            Viết về những câu chuyện thú vị, ý nghĩa mà bạn đã trải qua.
          </td>
          <td className="p-5">
            <div className="font-bold py-2">Bàn luận:</div>
            Chia sẻ quan điểm của bạn về các vấn đề nóng hổi trong xã hội.
            <div className="font-bold py-2">Bình luận:</div>
            Tham gia vào các cuộc thảo luận và chia sẻ ý kiến của bạn về các bài
            đăng khác.
          </td>
        </div>
        <div className="py-1">
          23h59' cam kết mang đến cho bạn:
          <td className="">
            <div className="font-bold py-2">
              Môi trường an toàn và thân thiện:
            </div>
            Nơi bạn có thể thoải mái chia sẻ mà không lo bị phán xét hay chỉ
            trích.
            <div className="font-bold py-2">Cộng đồng tích cực và hỗ trợ:</div>
            Nơi bạn có thể kết nối với những người có cùng sở thích và suy nghĩ.
          </td>
          <td className="p-5">
            <div className="font-bold py-2">Nội dung đa dạng và phong phú:</div>
            Luôn cập nhật những bài viết mới mẻ, hấp dẫn từ nhiều tác giả khác
            nhau.
          </td>
        </div>
        <div className="mt-5">
        23h59' luôn mong muốn mang đến
        cho bạn những trải nghiệm tốt nhất. Nếu bạn có bất kỳ góp ý hoặc đề xuất
        nào, vui lòng liên hệ với chúng tôi qua email: [email protected]. Hãy
        cùng 23h59' viết nên những câu chuyện của riêng bạn!
        </div>
      </tr>
    </div>
  );
};

export default About;
