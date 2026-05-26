import React from 'react'

const tableData = [
  {
    timing: '회원가입',
    badge: '카카오 로그인',
    items: '카카오 사용자 ID, 닉네임',
    method: '카카오 API 자동 수집',
  },
  {
    timing: '프로필 설정',
    badge: null,
    items: '닉네임(변경 시), 프로필 이미지',
    method: '사용자 직접 입력/업로드',
  },
  {
    timing: '리뷰 작성',
    badge: null,
    items: '리뷰 내용, 평점, 수강 인증 파일(이미지)',
    method: '사용자 직접 입력/업로드',
  },
  {
    timing: '서비스 이용',
    badge: null,
    items: '쿠키(인증 토큰)',
    method: '자동 생성',
  },
]

const sections = [
  {
    num: 2,
    title: '개인정보의 수집 및 이용 목적',
    items: [
      '회원 식별 및 인증 (카카오 ID, 닉네임)',
      '서비스 내 프로필 표시 (닉네임, 프로필 이미지)',
      '리뷰 작성자 표시 및 수강 인증 확인 (닉네임, 인증 파일)',
      '로그인 상태 유지 (쿠키)',
    ],
  },
  {
    num: 3,
    title: '개인정보의 보유 및 파기',
    items: [
      '회원 탈퇴 시 개인정보는 지체 없이 파기합니다.',
      '삭제된 리뷰는 소프트 삭제 처리되며, 일정 기간 후 완전 삭제됩니다.',
      '업로드된 파일(프로필 이미지, 인증 파일)은 탈퇴 또는 삭제 시 함께 파기합니다.',
    ],
  },
  {
    num: 4,
    title: '쿠키 사용',
    items: [
      '서비스는 로그인 인증을 위해 HTTP-Only 쿠키를 사용합니다.',
      '쿠키에는 인증 토큰만 저장되며, 24시간 후 만료됩니다.',
      '로그아웃 시 쿠키는 즉시 삭제됩니다.',
    ],
  },
  {
    num: 5,
    title: '개인정보의 제3자 제공',
    items: [
      '서비스는 회원의 개인정보를 제3자에게 제공하지 않습니다.',
      '단, 법령에 의해 요구되는 경우 예외로 합니다.',
    ],
  },
  {
    num: 6,
    title: '개인정보의 안전성 확보 조치',
    items: [
      '인증 토큰은 암호화(JWT 서명)하여 저장합니다.',
      '쿠키는 HTTP-Only 설정으로 스크립트 접근을 차단합니다.',
      '비밀번호는 수집하지 않습니다 (카카오 OAuth2 인증 위임).',
    ],
  },
  {
    num: 7,
    title: '이용자의 권리',
    items: [
      '회원은 언제든지 닉네임, 프로필 이미지를 변경할 수 있습니다.',
      '회원은 본인의 리뷰를 삭제할 수 있습니다.',
      '회원은 탈퇴를 통해 개인정보 삭제를 요청할 수 있습니다.',
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
    fontSize: '2.2rem',
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
    marginBottom: '2rem',
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
  tableWrap: {
    border: '1px solid #efefef',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
    tableLayout: 'fixed',
  },
  th: {
    background: '#fafafa',
    padding: '10px 14px',
    fontWeight: 600,
    fontSize: '12px',
    color: '#888',
    textAlign: 'left',
    borderBottom: '1px solid #efefef',
  },
  td: {
    padding: '12px 14px',
    verticalAlign: 'top',
    color: '#333',
    borderBottom: '1px solid #f5f5f5',
    lineHeight: 1.55,
  },
  tdEven: {
    background: '#fafafa',
  },
  badge: {
    display: 'inline-block',
    fontSize: '11px',
    background: '#f3f3f3',
    color: '#888',
    padding: '2px 7px',
    borderRadius: '4px',
    marginTop: '5px',
    border: '1px solid #ebebeb',
  },
  emailLabel: {
    fontSize: '13px',
    color: '#aaa',
    margin: '0 0 4px',
  },
  emailLink: {
    fontSize: '14px',
    color: '#4a8cf5',
    textDecoration: 'none',
  },
}

const PrivacyPolicy = () => {
  return (
    <div style={styles.wrap}>
      <h1 style={styles.heading}>개인정보 처리방침</h1>
      <p style={styles.subtext}>
        본 방침은 서비스 이용에 따른 개인정보 수집 및 처리에 관한 사항을 안내합니다.
      </p>

      {/* 제1조 */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.numBadge}>1</span>
          수집하는 개인정보 항목
        </h2>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <colgroup>
              <col style={{ width: '26%' }} />
              <col style={{ width: '44%' }} />
              <col style={{ width: '30%' }} />
            </colgroup>
            <thead>
              <tr>
                <th style={styles.th}>수집 시점</th>
                <th style={styles.th}>항목</th>
                <th style={styles.th}>수집 방법</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => {
                const tdStyle = i % 2 === 1 ? { ...styles.td, ...styles.tdEven } : styles.td
                const isLast = i === tableData.length - 1
                const finalTd = isLast ? { ...tdStyle, borderBottom: 'none' } : tdStyle
                return (
                  <tr key={i}>
                    <td style={finalTd}>
                      {row.timing}
                      {row.badge && (
                        <>
                          <br />
                          <span style={styles.badge}>{row.badge}</span>
                        </>
                      )}
                    </td>
                    <td style={finalTd}>{row.items}</td>
                    <td style={finalTd}>{row.method}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 제2조 ~ 제7조 */}
      {sections.map((sec, si) => (
        <React.Fragment key={sec.num}>
          <hr style={styles.divider} />
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.numBadge}>{sec.num}</span>
              {sec.title}
            </h2>
            <ol style={styles.ol}>
              {sec.items.map((item, ii) => (
                <li key={ii} style={styles.li}>
                  <span style={styles.liNum}>{ii + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </React.Fragment>
      ))}

      {/* 제8조 */}
      <hr style={styles.divider} />
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          <span style={styles.numBadge}>8</span>
          개인정보 보호책임자
        </h2>
        <p style={styles.emailLabel}>서비스 관리자 이메일</p>
        <a href="mailto:seoyeon.park.dev@gmail.com" style={styles.emailLink}>
          seoyeon.park.dev@gmail.com
        </a>
      </div>
    </div>
  )
}

export default PrivacyPolicy
