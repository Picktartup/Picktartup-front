import { jwtDecode } from 'jwt-decode';

/**
 * JWT 토큰에서 userId를 추출하는 유틸리티 함수
 * @param {string} token - JWT 토큰
 * @returns {string|null} userId
 */
export const extractUserIdFromToken = (token) => {
    try {
        const decoded = jwtDecode(token); // 토큰 디코딩
        return decoded.userId; // 클레임에서 userId 추출
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

/**
 * JWT 토큰이 만료되었는지 확인하는 유틸리티 함수
 * @param {string} token - JWT 토큰
 * @returns {boolean} - 만료 여부
 */
export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // 현재 시간 (초 단위)
        return decoded.exp < currentTime; // 토큰 만료 여부 확인
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // 에러 발생 시 만료된 것으로 처리
    }
};
