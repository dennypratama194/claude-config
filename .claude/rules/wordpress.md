---
paths:
  - "**/*.php"
  - "**/wp-content/**"
  - "**/themes/**"
  - "**/plugins/**"
  - "functions.php"
  - "style.css"
---

# WordPress Rules
# Loaded only when working with PHP or WordPress files

## Core Rules
- Read functions.php before adding any new hooks or functions
- Check if a function already exists before creating it — no duplicates
- Enqueue scripts and styles properly via wp_enqueue_scripts hook
- Never hardcode URLs — use get_template_directory_uri() and home_url()

## Safety Rules
- Never edit WordPress core files
- Never use eval() or base64 encoded execution
- Sanitize all inputs: sanitize_text_field(), esc_url(), intval()
- Escape all outputs: esc_html(), esc_attr(), esc_url()

## Theme Development
- Use get_template_part() for reusable sections
- Keep template files thin — logic goes in functions.php or custom classes
- Child theme: always confirm if this is parent or child before editing

## ACF / Custom Fields
- Check if ACF is active before using ACF functions
- Use get_field() not the_field() when you need to process the value
- Always provide fallback content when a field might be empty

## Database / Queries
- Use WP_Query not raw SQL unless there is no alternative
- Cache expensive queries with transients
- Never run queries inside loops
