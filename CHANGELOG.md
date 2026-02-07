# Changelog

## [0.2.0] - 2026-02-06
### Added
- Virtual Keypad
- Display and Keypad CSS files

### Changed
- Added global event listener at container level
- Migrate logic from Display to Calculator to support the above
- Refactored and unified physical (keyboard) with virtual (keypad) keys

## [0.1.0] - 2026-02-04
### Added
- Core calculator logic (tokenizer, parser, evaluator)
- Cursor-aware editor reducer
- Unary operator parsing

### Changed
- Parser refactored to recursive descent structure

### Fixed
- Incorect operator precedence for multiplication
- Multiple tokens appended to the same array