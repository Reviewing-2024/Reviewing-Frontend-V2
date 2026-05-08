import React from 'react'

const terms_and_conditions = () => {
  return (
    <div style={{
      maxWidth: '680px',
      margin: '0 auto',
      fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
      color: 'var(--color-text-primary)',
      lineHeight: 1.8,
    }}>

      <h1>이용약관</h1>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--color-border-tertiary)',
        }}>
          제1조 (목적)
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
          본 약관은 리뷰잉(이하 "서비스")이 제공하는 강의 리뷰 플랫폼 서비스의 이용 조건 및
          절차에 관한 사항을 규정합니다.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--color-border-tertiary)',
        }}>
          제2조 (회원가입 및 탈퇴)
        </h2>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <li style={{ marginBottom: '6px' }}>회원가입은 카카오 계정을 통한 소셜 로그인으로 이루어집니다.</li>
          <li style={{ marginBottom: '6px' }}>로그인 시 자동으로 회원으로 등록되며, 별도의 가입 절차는 없습니다.</li>
          <li>회원은 언제든지 탈퇴를 요청할 수 있으며, 탈퇴 시 개인정보는 지체 없이 파기합니다.</li>
        </ol>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--color-border-tertiary)',
        }}>
          제3조 (서비스 내용)
        </h2>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <li style={{ marginBottom: '6px' }}>온라인 강의 플랫폼(노마드코더, 인프런, 코드잇, 코딩애플, 패스트캠퍼스)의 강의 정보 제공</li>
          <li style={{ marginBottom: '6px' }}>강의 리뷰 작성, 조회, 삭제</li>
          <li style={{ marginBottom: '6px' }}>강의 찜(북마크) 기능</li>
          <li style={{ marginBottom: '6px' }}>강의 추천 챗봇(AI 기반)</li>
          <li>강의 검색</li>
        </ol>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--color-border-tertiary)',
        }}>
          제4조 (리뷰 정책)
        </h2>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <li style={{ marginBottom: '6px' }}>리뷰 작성 시 수강 인증 파일을 함께 제출해야 합니다.</li>
          <li style={{ marginBottom: '6px' }}>작성된 리뷰는 관리자 검토 후 승인(APPROVED) 또는 거절(REJECTED)됩니다.</li>
          <li style={{ marginBottom: '6px' }}>승인 전 상태(PENDING)에서는 다른 사용자에게 노출되지 않습니다.</li>
          <li style={{ marginBottom: '6px' }}>동일 강의에 대해 승인 또는 대기 중인 리뷰가 있는 경우 중복 작성할 수 없습니다.</li>
          <li>회원은 본인이 작성한 리뷰를 삭제할 수 있으며, 삭제 후 재작성이 가능합니다.</li>
        </ol>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--color-border-tertiary)',
        }}>
          제5조 (금지 행위)
        </h2>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <li style={{ marginBottom: '6px' }}>허위 수강 인증 파일 제출</li>
          <li style={{ marginBottom: '6px' }}>욕설, 비방, 광고 등 부적절한 내용의 리뷰 작성</li>
          <li style={{ marginBottom: '6px' }}>서비스의 정상적인 운영을 방해하는 행위</li>
          <li>타인의 개인정보를 무단으로 수집하거나 이용하는 행위</li>
        </ol>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--color-border-tertiary)',
        }}>
          제6조 (서비스 제한)
        </h2>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <li style={{ marginBottom: '6px' }}>금지 행위 위반 시 리뷰 거절 또는 서비스 이용이 제한될 수 있습니다.</li>
          <li>서비스는 사전 공지 후 일시적으로 중단될 수 있습니다.</li>
        </ol>
      </section>

      <section>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--color-border-tertiary)',
        }}>
          제7조 (면책)
        </h2>
        <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <li style={{ marginBottom: '6px' }}>서비스는 강의 정보를 각 플랫폼에서 수집하여 제공하며, 강의 내용 및 품질에 대해 책임지지 않습니다.</li>
          <li>회원이 작성한 리뷰의 내용에 대한 책임은 작성자 본인에게 있습니다.</li>
        </ol>
      </section>

    </div>
  )
}

export default terms_and_conditions