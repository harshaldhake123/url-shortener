# URL shortener

## Implementation Roadmap

### Phase 1: MVP

Goal: Launch something people can try instantly, while setting up the base for accounts later.

- Shorten URL (anyone can shorten).
- Redirect (short code -> original URL).
- Anonymous links auto-expire after N days/clicks.
- Logged-in links: tied to users, no expiration or other control.
- Authentication (sign up, login with Auth0/Google).
Basic UI:
- Paste long URL -> get short link.
- Show warning for anonymous users: 'Anonymous links may expire. Create an account to retain.

✅ Outcome: A working demo where anyone can shorten, but signing up feels worthwhile.

### Phase 2 - User Experience

Goal: Give logged-in users a reason to stay - visibility into their links.

- Link listing (for logged-in users only).
- Show table: short code, original URL, created date.
- Simple Stats.
- Track click count and last accessed time.
- Display in user’s table.

✅ Outcome: Users feel ownership. Anonymous users remain trial-only.

### Phase 3 - Control

Goal: Let users manage their links instead of just consuming.

- Custom alias (choose short code if available).
- Delete/disable (mark link inactive).
polished UI :
- Copy-to-clipboard for short URL.
- Sort/filter/search in table.

✅ Outcome: Links become manageable, not throwaway.

### Phase 4 - Insight & Safety

Goal: Prevent abuse and start showing real value through analytics.

Analytics:

- Store per-click timestamp (+ maybe IP/client).
- Show simple 'clicks over time' chart in UI.
- Rate limiting:
- Cap shortening attempts (especially anonymous).

✅ Outcome: Feels professional and robust.

### Phase 5 onwards

Goal: Explore advanced features

- Expose Developer APIs.
- 2-step anonymous redirect through platform with added delay.
- Edit links (change expiration/alias after creation).
