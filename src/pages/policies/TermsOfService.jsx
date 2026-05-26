import React from 'react'

const sections = [
  {
    num: 1,
    title: '목적',
    type: 'paragraph',
    content:
      '본 약관은 리뷰잉(이하 "서비스")이 제공하는 강의 리뷰 플랫폼 서비스의 이용 조건 및 절차에 관한 사항을 규정합니다.',
  },
  {
    num: 2,
    title: '회원가입 및 탈퇴',
    type: 'list',
    items: [
      '회원가입은 카카오 계정을 통한 소셜 로그인으로 이루어집니다.',
      '로그인 시 자동으로 회원으로 등록되며, 별도의 가입 절차는 없습니다.',
      '회원은 언제든지 탈퇴를 요청할 수 있으며, 탈퇴 시 개인정보는 지체 없이 파기합니다.',
    ],
  },
  {
    num: 3,
    title: '서비스 내용',
    type: 'list',
    items: [
      '온라인 강의 플랫폼(노마드코더, 인프런, 코드잇, 코딩애플, 패스트캠퍼스)의 강의 정보 제공',
      '강의 리뷰 작성, 조회, 삭제',
      '강의 찜(북마크) 기능',
      '강의 추천 챗봇(AI 기반)',
      '강의 검색',
    ],
  },
  {
    num: 4,
    title: '리뷰 정책',
    type: 'list',
    items: [
      '리뷰 작성 시 수강 인증 파일을 함께 제출해야 합니다.',
      '작성된 리뷰는 관리자 검토 후 승인(APPROVED) 또는 거절(REJECTED)됩니다.',
      '승인 전 상태(PENDING)에서는 다른 사용자에게 노출되지 않습니다.',
      '동일 강의에 대해 승인 또는 대기 중인 리뷰가 있는 경우 중복 작성할 수 없습니다.',
      '회원은 본인이 작성한 리뷰를 삭제할 수 있으며, 삭제 후 재작성이 가능합니다.',
    ],
  },
  {
    num: 5,
    title: '금지 행위',
    type: 'list',
    items: [
      '허위 수강 인증 파일 제출',
      '욕설, 비방, 광고 등 부적절한 내용의 리뷰 작성',
      '서비스의 정상적인 운영을 방해하는 행위',
      '타인의 개인정보를 무단으로 수집하거나 이용하는 행위',
    ],
  },
  {
    num: 6,
    title: '서비스 제한',
    type: 'list',
    items: [
      '금지 행위 위반 시 리뷰 거절 또는 서비스 이용이 제한될 수 있습니다.',
      '서비스는 사전 공지 후 일시적으로 중단될 수 있습니다.',
    ],
  },
  {
    num: 7,
    title: '면책',
    type: 'list',
    items: [
      '서비스는 강의 정보를 각 플랫폼에서 수집하여 제공하며, 강의 내용 및 품질에 대해 책임지지 않습니다.',
      '회원이 작성한 리뷰의 내용에 대한 책임은 작성자 본인에게 있습니다.',
    ],
  },
]

const styles = {
  wrap: {
    maxWidth: '720px',
    margin: '0 auto',
    padding: '65px 32px 32px 32px',
    fontFamily: "'Pretendard', 'Apple SD Gothic Neo', sans-serif",
    color: '#1a1a1a',
    lineHeight: 1.7,
  },
  heading: {
    fontSize: '22px',
    fontWeight: 600,
    textAlign: 'center', 
    marginBottom: '32px',
    letterSpacing: '-0.3px',
  },
  subtext: {
    fontSize: '13px',
    color: '#888',
    margin: '0 0 2.5rem',
  },
  divider: {
    border: 'none',
    borderTop: '1px solid #f0f0f0',
    margin: '2rem 0',
  },
  section: {
    marginBottom: '0',
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '15px',
    fontWeight: 600,
    margin: '0 0 0.9rem',
    letterSpacing: '-0.2px',
  },
  numBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#f3f3f3',
    fontSize: '11px',
    color: '#888',
    fontWeight: 500,
    flexShrink: 0,
  },
  paragraph: {
    fontSize: '14px',
    color: '#555',
    margin: 0,
  },
  ol: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  li: {
    display: 'flex',
    gap: '10px',
    fontSize: '14px',
    color: '#555',
  },
  liNum: {
    color: '#bbb',
    fontSize: '13px',
    flexShrink: 0,
    marginTop: '2px',
  },
}

const TermsOfService = () => {
  return (
    <div style={styles.wrap}>
      <h1 style={styles.heading}>이용약관</h1>
      <p style={styles.subtext}>
        리뷰잉 서비스 이용에 앞서 아래 약관을 확인해 주세요.
      </p>

      {sections.map((sec, i) => (
        <React.Fragment key={sec.num}>
          {i !== 0 && <hr style={styles.divider} />}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.numBadge}>{sec.num}</span>
              {sec.title}
            </h2>

            {sec.type === 'paragraph' ? (
              <p style={styles.paragraph}>{sec.content}</p>
            ) : (
              <ol style={styles.ol}>
                {sec.items.map((item, ii) => (
                  <li key={ii} style={styles.li}>
                    <span style={styles.liNum}>{ii + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default TermsOfService