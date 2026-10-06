# Portfolio analytics

The site uses GA4 measurement ID `G-PXR24BFQ8T` in `src/app/layout.tsx`. The Google tag sends the initial page view. In the GA4 web data stream, keep **Enhanced measurement > Page views > Page changes based on browser history events** enabled so Next.js client navigation is counted. Do not add a second manual `page_view` event while that setting is on.

GA4 creates and manages `session_start`, `ga_session_id`, and engagement automatically. Its default session timeout is 30 minutes of inactivity; change it in the GA4 web data stream's tag settings only if a different timeout is needed. GA4 also derives approximate country, region, and city from the collection request. No browser geolocation permission or custom location event is needed. Review **Admin > Data collection > Granular location and device data** if city is absent.

Additional site events:

| Event | Trigger | Parameters |
| --- | --- | --- |
| `project_open` | Open a project detail page from a link | `project_id`, `source_page` |
| `project_filter_select` | Select a project category | `category` |
| `external_link_click` | Open an external site | `destination_host`, `source_page` |
| `resume_download` | Click a local PDF link | `file_name` |
| `contact_link_click` | Click email or phone | `contact_method` |
| `contact_form_submit` | Contact API accepts a form | `form_location` |
| `chat_open` | Open the assistant | — |
| `chat_message_submit` | Send a prompt to the assistant | — |

Names, email addresses, phone numbers, and message or prompt text are never sent as custom event parameters. GA4's Enhanced measurement may also show its own `click` and `file_download` events; these are different event names for the same actions.

To see the event parameters in standard GA4 reports, create event-scoped custom dimensions in **Admin > Custom definitions** for `project_id`, `source_page`, `category`, `destination_host`, `file_name`, `contact_method`, and `form_location`. Mark `contact_form_submit` as a key event if contact requests are the conversion to measure. Verify with **Realtime** or **DebugView** after deployment: load the site, navigate between pages, open a project, and submit a test form. Check that each navigation produces one `page_view` and that the custom events appear under the same session. Standard reports can take longer to populate.
