# WhatsApp Integration for Order Confirmation

This guide explains how to send WhatsApp messages when an order is confirmed in the Coffee Culture AI agent.

## Options for Sending WhatsApp Messages

### 1. Twilio WhatsApp API (Recommended)

Twilio provides a reliable WhatsApp Business API integration.

#### Installation

```bash
pip install twilio
```

#### Setup

1. Create a Twilio account at [twilio.com](https://www.twilio.com)
2. Enable WhatsApp in the Twilio Console
3. Get your Account SID and Auth Token
4. Set up a WhatsApp sandbox for testing or apply for a WhatsApp Business Account

#### Environment Variables

Add to your `.env.local`:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886  # Twilio sandbox number
```

#### Implementation

Update `apps/agent/ai/tools.py`:

```python
import os
from twilio.rest import Client
from langchain.tools import tool

# Initialize Twilio client
twilio_client = Client(
    os.getenv("TWILIO_ACCOUNT_SID"),
    os.getenv("TWILIO_AUTH_TOKEN")
)

def send_whatsapp_message(to_number: str, message: str) -> bool:
    """Send a WhatsApp message using Twilio."""
    try:
        twilio_client.messages.create(
            body=message,
            from_=os.getenv("TWILIO_WHATSAPP_NUMBER"),
            to=f"whatsapp:{to_number}"
        )
        return True
    except Exception as e:
        print(f"Failed to send WhatsApp message: {e}")
        return False


@tool
def confirm_order(order_summary: str, customer_phone: str) -> str:
    """Confirm the final order and send WhatsApp notification.

    Args:
        order_summary: A summary of all items in the order
        customer_phone: Customer's phone number with country code (e.g., +919876543210)
    """
    # Send WhatsApp notification
    message = f"🎉 Order Confirmed!\n\n{order_summary}\n\nThank you for ordering from Coffee Culture!"

    if send_whatsapp_message(customer_phone, message):
        return f"Order confirmed: {order_summary}. WhatsApp notification sent to {customer_phone}."
    else:
        return f"Order confirmed: {order_summary}. Failed to send WhatsApp notification."
```

---

### 2. Meta WhatsApp Cloud API (Official)

Direct integration with Meta's official WhatsApp Business Platform.

#### Installation

```bash
pip install requests
```

#### Setup

1. Create a Meta Business account
2. Set up a WhatsApp Business App in Meta Developer Console
3. Get your Access Token and Phone Number ID

#### Environment Variables

```env
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
```

#### Implementation

```python
import os
import requests
from langchain.tools import tool

def send_whatsapp_message(to_number: str, message: str) -> bool:
    """Send WhatsApp message using Meta Cloud API."""
    url = f"https://graph.facebook.com/v18.0/{os.getenv('WHATSAPP_PHONE_NUMBER_ID')}/messages"

    headers = {
        "Authorization": f"Bearer {os.getenv('WHATSAPP_ACCESS_TOKEN')}",
        "Content-Type": "application/json"
    }

    payload = {
        "messaging_product": "whatsapp",
        "to": to_number.replace("+", ""),
        "type": "text",
        "text": {"body": message}
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        return True
    except Exception as e:
        print(f"Failed to send WhatsApp message: {e}")
        return False


@tool
def confirm_order(order_summary: str, customer_phone: str) -> str:
    """Confirm the final order and send WhatsApp notification.

    Args:
        order_summary: A summary of all items in the order
        customer_phone: Customer's phone number with country code (e.g., +919876543210)
    """
    message = f"🎉 Order Confirmed!\n\n{order_summary}\n\nThank you for ordering from Coffee Culture!"

    if send_whatsapp_message(customer_phone, message):
        return f"Order confirmed: {order_summary}. WhatsApp notification sent."
    else:
        return f"Order confirmed: {order_summary}. WhatsApp notification failed."
```

---

### 3. Using Message Templates (Recommended for Production)

For production use, WhatsApp requires pre-approved message templates.

#### Template Example

```python
def send_order_confirmation_template(to_number: str, order_id: str, items: str, total: str):
    """Send order confirmation using approved template."""
    url = f"https://graph.facebook.com/v18.0/{os.getenv('WHATSAPP_PHONE_NUMBER_ID')}/messages"

    headers = {
        "Authorization": f"Bearer {os.getenv('WHATSAPP_ACCESS_TOKEN')}",
        "Content-Type": "application/json"
    }

    payload = {
        "messaging_product": "whatsapp",
        "to": to_number,
        "type": "template",
        "template": {
            "name": "order_confirmation",  # Your approved template name
            "language": {"code": "en"},
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {"type": "text", "text": order_id},
                        {"type": "text", "text": items},
                        {"type": "text", "text": total}
                    ]
                }
            ]
        }
    }

    response = requests.post(url, headers=headers, json=payload)
    return response.status_code == 200
```

---

## Quick Start with Twilio (Easiest)

1. **Install dependency:**

   ```bash
   cd apps/agent
   pip install twilio
   ```

2. **Add to `.env.local`:**

   ```env
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```

3. **For testing:** Join Twilio Sandbox by sending "join <sandbox-keyword>" to the Twilio WhatsApp number

4. **Update `tools.py`** with the Twilio implementation above

---

## Testing

For development/testing:

- **Twilio Sandbox**: Free testing with sandbox number
- **Meta Test Number**: Use test phone numbers in Meta Developer Console

---

## Pricing

| Provider       | Cost                                    |
| -------------- | --------------------------------------- |
| Twilio         | ~$0.005-0.08 per message                |
| Meta Cloud API | Free for first 1000 conversations/month |

---

## Best Practices

1. **Store customer consent** before sending WhatsApp messages
2. **Use templates** for transactional messages in production
3. **Handle failures gracefully** - don't block order confirmation if WhatsApp fails
4. **Rate limiting** - WhatsApp has rate limits, implement queuing for high volume
5. **Phone number validation** - Validate phone numbers before sending
